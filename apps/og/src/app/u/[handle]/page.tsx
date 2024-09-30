import common from "@/common";
import {
  LENS_NAMESPACE_PREFIX,
  TAPE_APP_DESCRIPTION,
  TAPE_APP_NAME,
  TAPE_WEBSITE_URL
} from "@dragverse/constants";
import { getProfile, getProfilePicture } from "@dragverse/generic";
import { apolloClient } from "@dragverse/lens/apollo";
import { type Profile, ProfileDocument } from "@dragverse/lens/generated";
import type { Metadata } from "next";

type Props = {
  params: { handle: string };
};

const client = apolloClient();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;
  const { data } = await client.query({
    query: ProfileDocument,
    variables: { request: { forHandle: `${LENS_NAMESPACE_PREFIX}${handle}` } }
  });

  if (!data.profile) {
    return common;
  }

  const profile: Profile = data?.profile;

  const title = `${getProfile(profile).displayName} (${
    getProfile(profile).slugWithPrefix
  }) • ${TAPE_APP_NAME}`;
  const description = profile?.metadata?.bio || TAPE_APP_DESCRIPTION;
  const pfp = getProfilePicture(profile, "AVATAR_LG");

  return {
    title,
    description,
    metadataBase: new URL(`${TAPE_WEBSITE_URL}/u/${profile.handle}`),
    openGraph: {
      title,
      description,
      type: "profile",
      images: [pfp],
      siteName: TAPE_APP_NAME
    },
    twitter: {
      title,
      description,
      card: "summary",
      images: [pfp]
    }
  };
}

export default function Page({ params }: Props) {
  return <div>{params.handle}</div>;
}
