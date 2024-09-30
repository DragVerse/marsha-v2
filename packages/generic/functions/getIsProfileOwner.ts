import type { Profile } from "@dragverse/lens";

import { getProfile } from "./getProfile";

export const getIsProfileOwner = (
  profile: Profile,
  address: string | undefined
) => {
  return getProfile(profile)?.address?.toLowerCase() === address?.toLowerCase();
};
