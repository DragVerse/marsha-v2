import ProfileSuspended from "@/components/Common/ProfileSuspended";
import useSw from "@/hooks/useSw";
import Custom404 from "@/pages/404";
import Custom500 from "@/pages/500";
import { LENS_NAMESPACE_PREFIX, WORKER_TRAILS_URL } from "@dragverse/constants";
import {
  EVENTS,
  getIsSuspendedProfile,
  getProfile,
  getValueFromKeyInAttributes
} from "@dragverse/generic";
import {
  type Profile,
  type ProfileRequest,
  useProfileQuery
} from "@dragverse/lens";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import MetaTags from "../Common/MetaTags";
import ProfilePageShimmer from "../Shimmers/ProfilePageShimmer";
import BasicInfo from "./BasicInfo";
import Cover from "./Cover";
import ProfileTabs from "./Tabs";
import PinnedVideo from "./Tabs/PinnedVideo";

const ViewProfile = () => {
  const { query } = useRouter();
  const { addEventToQueue } = useSw();
  const handle = query.handle as string[];
  const forProfileId = query.id as string;

  useEffect(() => {
    addEventToQueue(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.PROFILE });
  }, []);

  const forHandle =
    handle?.length > 1 ? handle.join("/") : `${LENS_NAMESPACE_PREFIX}${handle}`;
  const request: ProfileRequest = forProfileId
    ? { forProfileId }
    : { forHandle };

  const addTrail = async (pid: string) => {
    try {
      await fetch(WORKER_TRAILS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pid,
          action: "view_profile"
        })
      });
    } catch {}
  };

  const { data, loading, error } = useProfileQuery({
    variables: {
      request
    },
    skip: !forProfileId && !handle,
    onCompleted: ({ profile }) => {
      if (profile) {
        addTrail(profile?.id);
      }
    }
  });

  if (loading || !data) {
    return <ProfilePageShimmer />;
  }

  if (!data?.profile) {
    return <Custom404 />;
  }

  if (error) {
    return <Custom500 />;
  }

  const profile = data?.profile as Profile;

  const isSuspended = getIsSuspendedProfile(profile.id);

  if (isSuspended) {
    return <ProfileSuspended />;
  }

  const pinnedVideoId = getValueFromKeyInAttributes(
    profile?.metadata?.attributes,
    "pinnedPublicationId"
  );

  const slugWithPrefix = getProfile(profile)?.slugWithPrefix;
  const displayName = getProfile(profile)?.displayName;

  return (
    <>
      <MetaTags title={`${displayName} (${slugWithPrefix})`} />
      {!loading && !error && profile ? (
        <>
          <Cover profile={profile} />
          <div className="container mx-auto max-w-screen-xl px-2 xl:px-0">
            <BasicInfo profile={profile} />
            {pinnedVideoId?.length ? <PinnedVideo id={pinnedVideoId} /> : null}
            <ProfileTabs profile={profile} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default memo(ViewProfile);
