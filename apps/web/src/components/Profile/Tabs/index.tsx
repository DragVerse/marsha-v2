import { EVENTS, getProfile } from "@dragverse/generic";
import type { Profile } from "@dragverse/lens";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dragverse/ui";
import { useRouter } from "next/router";
import type { FC } from "react";

import useSw from "@/hooks/useSw";

import OtherProfiles from "./OtherProfiles";
import ProfileAudios from "./ProfileAudios";
import ProfileBytes from "./ProfileBytes";
import ProfileVideos from "./ProfileVideos";

type Props = {
  profile: Profile;
};

const ProfileTabs: FC<Props> = ({ profile }) => {
  const router = useRouter();
  const { addEventToQueue } = useSw();

  const handleTabChange = (tab: string) => {
    if (tab) {
      const slug = getProfile(profile)?.slug;
      const nextUrl = `${location.origin}/u/${slug}?tab=${tab}`;
      history.replaceState({ path: nextUrl }, "", nextUrl);
    }
  };

  const activeTab = (router.query.tab ?? "videos") as string;

  return (
    <div className="my-4 w-full md:my-5">
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger
            className="rounded-t-lg border-black px-4 py-1.5 font-medium text-sm data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-gray-800"
            onClick={() => {
              handleTabChange("videos");
              addEventToQueue(EVENTS.PROFILE.CLICK_PROFILE_VIDEOS);
            }}
            value="videos"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            className="rounded-t-lg border-black px-4 py-1.5 font-medium text-sm data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-gray-800"
            onClick={() => {
              handleTabChange("bytes");
              addEventToQueue(EVENTS.PROFILE.CLICK_PROFILE_BYTES);
            }}
            value="bytes"
          >
            Bytes
          </TabsTrigger>
          <TabsTrigger
            className="rounded-t-lg border-black px-4 py-1.5 font-medium text-sm data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-brand-250/50"
            onClick={() => {
              handleTabChange("channels");
              // Tower.track(EVENTS.PROFILE.CLICK_OTHER_PROFILES)
            }}
            value="channels"
          >
            Channels
          </TabsTrigger>
          <TabsTrigger
            className="rounded-t-lg border-black px-4 py-1.5 font-medium text-sm data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-brand-250/50"
            onClick={() => {
              handleTabChange("audio");
              // Tower.track(EVENTS.PROFILE.CLICK_PROFILE_AUDIOS)
            }}
            value="audio"
          >
            Audio
          </TabsTrigger>
        </TabsList>

        <div className="pt-3">
          <TabsContent value="videos">
            <ProfileVideos profile={profile} />
          </TabsContent>

          <TabsContent value="bytes">
            <ProfileBytes profileId={profile.id} />
          </TabsContent>

          <TabsContent value="channels">
            <OtherProfiles currentProfile={profile} />
          </TabsContent>

          <TabsContent value="audio">
            <ProfileAudios profile={profile} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
