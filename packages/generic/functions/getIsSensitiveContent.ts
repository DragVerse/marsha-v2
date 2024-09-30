import type { PublicationMetadata } from "@dragverse/lens";

export const getIsSensitiveContent = (
  metadata: PublicationMetadata | null
): boolean => {
  return (
    Boolean(metadata?.attributes?.find((el) => el.value === "sensitive")) ||
    Boolean(metadata?.contentWarning)
  );
};
