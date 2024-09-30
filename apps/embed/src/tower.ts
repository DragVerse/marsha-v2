import {
  IS_MAINNET,
  IS_PRODUCTION,
  WORKER_TOWER_URL
} from "@dragverse/constants";
import { parseJwt } from "@dragverse/generic";
import { LocalStore } from "@dragverse/lens/custom-types";

export const Tower = {
  track: (name: string, properties?: Record<string, unknown>) => {
    if (IS_MAINNET && IS_PRODUCTION) {
      const tokenState = JSON.parse(
        localStorage.getItem(LocalStore.DRAGVERSE_AUTH_STORE) ||
          JSON.stringify({ state: { accessToken: "" } })
      );
      const actor = parseJwt(tokenState.state.accessToken)?.id;
      const { referrer } = document;
      const referrerDomain = referrer ? new URL(referrer).hostname : null;
      const storedFingerprint = localStorage.getItem(
        LocalStore.DRAGVERSE_FINGERPRINT
      );

      const payload = {
        name,
        properties,
        actor,
        fingerprint: storedFingerprint,
        referrer: referrerDomain,
        url: location.href,
        platform: "web",
        created: new Date().toISOString().slice(0, 19).replace("T", " ")
      };

      const xhr = new XMLHttpRequest();
      xhr.open("POST", WORKER_TOWER_URL);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(payload));
    }
  }
};
