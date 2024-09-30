import { LENS_NAMESPACE_PREFIX } from "@dragverse/constants";
import { getProfile, getProfilePicture } from "@dragverse/generic";
import type { Profile as LensProfileType } from "@dragverse/lens";
import type { Profile as ProfileType } from "@dragverse/lens/gql";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

import { rqClient } from "@/app/providers/react-query";

import { Profile } from "./_components/profile";
import { profileQuery } from "./queries";

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await rqClient.fetchQuery(
    profileQuery(`${LENS_NAMESPACE_PREFIX}${params.handle}`)
  );
  if (!data.profile) {
    return {};
  }
  const profile = data.profile as ProfileType;
  const pfp = getProfilePicture(profile as LensProfileType, "AVATAR_LG");

  return {
    title: `${getProfile(profile as LensProfileType).displayName} on Dragverse`,
    description: profile.metadata?.bio,
    openGraph: {
      images: [pfp]
    },
    twitter: {
      images: [pfp],
      card: "summary"
    }
  };
}

export function generateStaticParams() {
  return [{ handle: "titannode" }];
}

export default function ProfilePage({ params }: Props) {
  void rqClient.prefetchQuery(
    profileQuery(`${LENS_NAMESPACE_PREFIX}${params.handle}`)
  );

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <HydrationBoundary state={dehydrate(rqClient)}>
        <Profile />
      </HydrationBoundary>
    </div>
  );
}
