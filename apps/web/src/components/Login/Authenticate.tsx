import { signIn, signOut } from "@/lib/store/auth";
import useProfileStore from "@/lib/store/idb/profile";
import { ERROR_MESSAGE } from "@dragverse/constants";
import {
  getLennyPicture,
  getProfile,
  getProfilePicture,
  logger,
  shortenAddress
} from "@dragverse/generic";
import type { Profile } from "@dragverse/lens";
import {
  LimitType,
  useAuthenticateMutation,
  useChallengeLazyQuery,
  useProfilesManagedQuery
} from "@dragverse/lens";
import {
  Button,
  Callout,
  Select,
  SelectItem,
  WarningOutline
} from "@dragverse/ui";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSignMessage } from "wagmi";
import ButtonShimmer from "../Shimmers/ButtonShimmer";
import Signup from "./Signup";

const Authenticate = () => {
  const {
    query: { as, signup }
  } = useRouter();

  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const { activeProfile, setActiveProfile } = useProfileStore();

  const router = useRouter();
  const { user, authenticated } = usePrivy(); // Get login function from Privy
  const address = user?.wallet?.address;
  const isConnected = authenticated && !!address;

  useEffect(() => {
    if (signup) {
      setShowSignup(true);
    }
  }, [signup]);

  const onError = () => {
    signOut();
  };

  const {
    data,
    loading: profilesLoading,
    refetch
  } = useProfilesManagedQuery({
    variables: {
      request: { for: address, includeOwned: true, limit: LimitType.Fifty },
      lastLoggedInProfileRequest: { for: address }
    },
    notifyOnNetworkStatusChange: true,
    skip: !address,
    onCompleted: (data) => {
      const profiles = data?.profilesManaged.items;
      const lastLogin = data?.lastLoggedInProfile;
      if (profiles?.length) {
        const profile = lastLogin
          ? profiles.find((p) => p.id === lastLogin.id)
          : profiles[0];

        const profileId = as || (signup ? profiles?.[0]?.id : profile?.id);
        setSelectedProfileId(profileId);
      } else {
        setShowSignup(true);
      }
    }
  });

  const profilesManaged = data?.profilesManaged.items as Profile[];
  const lastLogin = data?.lastLoggedInProfile as Profile;

  const remainingProfiles = useMemo(() => {
    return lastLogin
      ? profilesManaged.filter((profile) => profile.id !== lastLogin.id)
      : profilesManaged;
  }, [profilesManaged, lastLogin]);

  const profiles = lastLogin
    ? [lastLogin, ...remainingProfiles]
    : remainingProfiles;

  const { signMessageAsync } = useSignMessage({
    mutation: { onError }
  });

  const [loadChallenge] = useChallengeLazyQuery({
    // if cache old challenge persist issue (InvalidSignature)
    fetchPolicy: "no-cache",
    onError
  });
  const [authenticate] = useAuthenticateMutation({
    onError
  });

  const handleSign = useCallback(async () => {
    if (!isConnected) {
      signOut();
      return toast.error("Please connect to your wallet");
    }
    try {
      setLoading(true);
      const challenge = await loadChallenge({
        variables: { request: { for: selectedProfileId, signedBy: address } }
      });
      if (!challenge?.data?.challenge?.text) {
        return toast.error(ERROR_MESSAGE);
      }
      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      });
      if (!signature) {
        return;
      }
      const result = await authenticate({
        variables: {
          request: { id: challenge.data?.challenge.id, signature }
        }
      });
      const accessToken = result.data?.authenticate.accessToken;
      const refreshToken = result.data?.authenticate.refreshToken;
      const identityToken = result.data?.authenticate.identityToken;
      signIn({ accessToken, refreshToken, identityToken });
      if (profilesManaged.length === 0) {
        setActiveProfile(null);
        toast.error("No profile found");
      } else {
        const profile = profilesManaged.find(
          (profile) => profile.id === selectedProfileId
        );
        if (profile) {
          setActiveProfile(profile);
        }
        const next = router.query?.next as string;
        if (!!next && next.startsWith("/") && !next.startsWith("//")) {
          router.push(next);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      logger.error("[Error Sign In]", {
        error
      });
      toast.error("Error signing in.");
    } finally {
      setLoading(false);
    }
  }, [router, user, isConnected, profilesManaged, selectedProfileId, signIn]);

  if (as && as === activeProfile?.id) {
    return null;
  }

  if (!isConnected) {
    return null;
  }

  if (profilesLoading) {
    return (
      <div className="space-y-2">
        <ButtonShimmer className="h-[46px]" />
        <ButtonShimmer className="h-[46px]" />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      {showSignup ? (
        <Signup
          onSuccess={() => {
            setShowSignup(false);
            refetch();
          }}
          setShowSignup={setShowSignup}
          showLogin={Boolean(profiles[0])}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {profiles[0] ? (
            <>
              <Select
                size="lg"
                defaultValue={as ?? profiles[0].id}
                value={selectedProfileId}
                onValueChange={(value) => setSelectedProfileId(value)}
                className="text-white"
              >
                {profiles?.map((profile) => (
                  <SelectItem
                    size="lg"
                    key={profile.id}
                    value={profile.id}
                    className="data-[state=open]:text-black"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={getProfilePicture(profile, "AVATAR")}
                        className="size-4 rounded-full"
                        onError={({ currentTarget }) => {
                          currentTarget.src = getLennyPicture(profile?.id);
                        }}
                        alt={getProfile(profile)?.displayName}
                      />
                      <span>{getProfile(profile).slugWithPrefix}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
              <Button
                size="md"
                loading={loading}
                onClick={handleSign}
                disabled={loading || !selectedProfileId}
              >
                Login
              </Button>
            </>
          ) : (
            <Callout
              variant="danger"
              icon={<WarningOutline className="size-4" />}
            >
              We couldn't find any profiles linked to the connected address. (
              {shortenAddress(address as string)})
            </Callout>
          )}
          <div className="flex items-center justify-center space-x-2 pt-3 text-sm text-white">
            {profiles[0] ? (
              <span>Need new account?</span>
            ) : (
              <span>Don't have an account?</span>
            )}
            <button
              type="button"
              className="font-bold text-brand-500"
              onClick={() => setShowSignup(true)}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Authenticate);
