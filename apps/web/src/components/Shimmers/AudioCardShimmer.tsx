import { tw } from "@dragverse/browser";

export const AudioCardShimmer = ({ rounded = true }) => {
  return (
    <div className={tw("w-full", rounded && "rounded-xl")}>
      <div className="flex animate-shimmer flex-col space-x-2">
        <div
          className={tw(
            "h-24 w-full bg-gray-200 md:h-40 dark:bg-brand-250/50",
            rounded && "rounded-large"
          )}
        />
      </div>
    </div>
  );
};
