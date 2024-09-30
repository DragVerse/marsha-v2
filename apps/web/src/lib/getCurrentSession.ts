import { parseJwt } from "@dragverse/generic";

import { hydrateAuthTokens } from "./store/auth";

const getCurrentSession = () => {
  const { refreshToken } = hydrateAuthTokens();

  const currentSession = parseJwt(refreshToken || "");

  return {
    profileId: currentSession?.id,
    authorizationId: currentSession?.authorizationId
  };
};

export default getCurrentSession;
