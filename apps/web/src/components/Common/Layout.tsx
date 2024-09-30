import getCurrentSession from "@/lib/getCurrentSession";
import { signOut } from "@/lib/store/auth";
import useProfileStore from "@/lib/store/idb/profile";
import useNonceStore from "@/lib/store/nonce";
import {
  getToastOptions,
  setFingerprint,
  tw,
  useIsMounted
} from "@dragverse/browser";
import { AUTH_ROUTES, OWNER_ONLY_ROUTES } from "@dragverse/constants";
import { getIsProfileOwner, trimify } from "@dragverse/generic";
import { type Profile, useCurrentProfileQuery } from "@dragverse/lens";
import { usePrivy } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { type FC, type ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import FullPageLoader from "./FullPageLoader";
import MetaTags from "./MetaTags";
import MobileBottomNav from "./MobileBottomNav";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
  skipNav?: boolean;
  skipPadding?: boolean;
}

const Layout: FC<Props> = ({ children, skipNav, skipPadding }) => {
  const { setLensHubOnchainSigNonce } = useNonceStore();
  const activeProfile = useProfileStore((state) => state.activeProfile);
  const setActiveProfile = useProfileStore((state) => state.setActiveProfile);

  const isMounted = useIsMounted();
  const { resolvedTheme } = useTheme();
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const { pathname, replace, asPath } = useRouter();
  const currentSession = getCurrentSession();

  const { loading } = useCurrentProfileQuery({
    variables: { request: { forProfileId: currentSession?.profileId } },
    skip: trimify(currentSession?.profileId).length === 0,
    onCompleted: ({ userSigNonces, profile }) => {
      if (!profile) {
        return signOut();
      }

      setActiveProfile(profile as Profile);
      setLensHubOnchainSigNonce(userSigNonces.lensHubOnchainSigNonce);
    },
    onError: () => signOut()
  });

  const validateAuthRoutes = () => {
    if (!currentSession?.profileId && AUTH_ROUTES.includes(pathname)) {
      replace(`/login?next=${asPath}`);
    }
    if (
      activeProfile &&
      address &&
      !getIsProfileOwner(activeProfile, address) &&
      OWNER_ONLY_ROUTES.includes(pathname)
    ) {
      replace("/settings");
    }
  };

  useEffect(() => {
    setFingerprint();
  }, []);

  useEffect(() => {
    validateAuthRoutes();
  }, [asPath, currentSession?.profileId, activeProfile]);

  if (!isMounted()) {
    return <MetaTags />;
  }

  if (!activeProfile && loading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <MetaTags />
      <Toaster
        position="bottom-right"
        containerStyle={{ wordBreak: "break-word" }}
        toastOptions={getToastOptions(resolvedTheme)}
      />
      {!skipNav && <Navbar />}
      <div
        className={tw("relative focus-visible:outline-none", {
          "laptop:px-6 px-4 ultrawide:px-8 pt-20 pb-6 ultrawide:pb-8":
            !skipPadding
        })}
      >
        {children}
      </div>
      <MobileBottomNav />
    </>
  );
};

export default Layout;
