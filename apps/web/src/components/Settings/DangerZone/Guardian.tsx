import { Countdown } from "@/components/UIElements/CountDown";
import useHandleWrongNetwork from "@/hooks/useHandleWrongNetwork";
import useProfileStore from "@/lib/store/idb/profile";
import { LENSHUB_PROXY_ABI } from "@dragverse/abis";
import { tw } from "@dragverse/browser";
import {
  ERROR_MESSAGE,
  LENSHUB_PROXY_ADDRESS,
  SIGN_IN_REQUIRED
} from "@dragverse/constants";
import { type Profile, useProfileLazyQuery } from "@dragverse/lens";
import type { CustomErrorWithData } from "@dragverse/lens/custom-types";
import { Button } from "@dragverse/ui";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const Guardian: FC = () => {
  const { activeProfile, setActiveProfile } = useProfileStore();

  const [loading, setLoading] = useState(false);
  const [guardianEnabled, setGuardianEnabled] = useState(
    activeProfile?.guardian?.protected
  );
  const handleWrongNetwork = useHandleWrongNetwork();

  const [fetchProfile] = useProfileLazyQuery({
    variables: {
      request: {
        forHandle: activeProfile?.handle?.fullHandle
      }
    },
    fetchPolicy: "no-cache",
    onCompleted: ({ profile }) => {
      if (profile) {
        setActiveProfile(profile as Profile);
      }
    }
  });

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE);
    setLoading(false);
  };

  const { data: txnHash, writeContractAsync } = useWriteContract({
    mutation: {
      onError
    }
  });

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txnHash,
    query: {
      enabled: txnHash && txnHash.length > 0
    }
  });

  useEffect(() => {
    if (isSuccess) {
      setGuardianEnabled(!guardianEnabled);
      setLoading(false);
      fetchProfile();
    }
  }, [isSuccess]);

  const toggle = async () => {
    if (!activeProfile?.id) {
      return toast.error(SIGN_IN_REQUIRED);
    }

    await handleWrongNetwork();

    try {
      setLoading(true);
      if (guardianEnabled) {
        return await writeContractAsync({
          address: LENSHUB_PROXY_ADDRESS,
          abi: LENSHUB_PROXY_ABI,
          functionName: "DANGER__disableTokenGuardian"
        });
      }
      return await writeContractAsync({
        address: LENSHUB_PROXY_ADDRESS,
        abi: LENSHUB_PROXY_ABI,
        functionName: "DANGER__disableTokenGuardian"
      });
    } catch (error) {
      onError(error as any);
    }
  };

  const isCooldownEnded = () => {
    const cooldownDate = activeProfile?.guardian?.cooldownEndsOn;
    return new Date(cooldownDate).getTime() < Date.now();
  };

  return (
    <div className="dragverse-border mb-4 rounded-medium bg-white dark:bg-cod">
      <div className="space-y-2 p-5">
        <h1 className="font-bold text-red-500 text-xl">
          Disable profile guardian
        </h1>
        <p>
          This will disable the Profile Guardian and allow you to do some
          actions like transfer, burn and approve without restrictions.
        </p>
        <ul className="list-inside list-disc">
          <li>
            A 7-day Security Cooldown Period need to be elapsed for the Profile
            Guardian to become effectively disabled.
          </li>
          <li>
            After Profile Guardian is effectively disabled, you will be able to
            execute approvals and transfers without restrictions.
          </li>
          <li>
            Disabling for one profile, disables guardian for other profiles that
            your wallet holds.
          </li>
        </ul>
      </div>

      <div
        className={tw(
          "flex rounded-b-medium border-b-0 bg-red-100 px-5 py-3 dark:bg-red-900/20",
          isCooldownEnded() ? "justify-end" : "justify-between"
        )}
      >
        {!isCooldownEnded() && (
          <span className="flex items-center space-x-2">
            <span>Cooldown period ends in: </span>
            <Countdown
              timestamp={activeProfile?.guardian?.cooldownEndsOn}
              endText="Cooldown period ended"
            />
          </span>
        )}
        {guardianEnabled ? (
          <Button
            variant="danger"
            disabled={loading}
            loading={loading}
            onClick={() => toggle()}
          >
            {loading ? "Disabling" : "Disable"}
          </Button>
        ) : (
          <Button disabled={loading} loading={loading} onClick={() => toggle()}>
            {loading ? "Enabling" : "Enable"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Guardian;
