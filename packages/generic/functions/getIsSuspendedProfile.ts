import { SUSPENDED_PROFILES } from "@dragverse/constants";

export const getIsSuspendedProfile = (profileId: string): boolean => {
  return SUSPENDED_PROFILES.includes(profileId);
};
