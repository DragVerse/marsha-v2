import type { Profile } from "@dragverse/lens";

export const getProfileCoverPicture = (
  profile: Profile,
  withFallback = false
): string => {
  return profile.metadata?.coverPicture?.optimized?.uri
    ? profile.metadata.coverPicture.optimized.uri
    : withFallback
      ? "ipfs://bafkreihn5v4hpuxgcysnpb4pgcerkmhwddxq65qswmit6j4nj44btyzdou" //`${STATIC_ASSETS}/images/fallback-cover.svg`
      : null;
};
