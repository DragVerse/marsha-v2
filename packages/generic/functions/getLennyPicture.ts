import { IS_MAINNET, WORKER_AVATAR_URL } from "@dragverse/constants";

export const getLennyPicture = (profileId: string) => {
  return IS_MAINNET
    ? `${WORKER_AVATAR_URL}/${profileId}`
    : `https://cdn.stamp.fyi/avatar/${profileId}?s=300`;
};
