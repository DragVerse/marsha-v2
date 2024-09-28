import { ProfileDocument, execute } from "@dragverse/lens/gql";
import { queryOptions } from "@tanstack/react-query";

export const profileQuery = (handle: string) =>
  queryOptions({
    queryKey: ["profile", handle],
    queryFn: () =>
      execute(ProfileDocument, {
        request: {
          forHandle: handle
        }
      })
  });
