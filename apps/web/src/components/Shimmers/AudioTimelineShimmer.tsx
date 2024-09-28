import { tw } from "@dragverse/browser";
import { useMemo } from "react";

const AudioTimelineShimmer = ({
  className,
  count = 8
}: {
  className?: string;
  count?: number;
}) => {
  const cards = useMemo(() => Array(count).fill(1), [count]);
  return (
    <div
      className={tw(
        "grid-col-1 grid desktop:grid-cols-4 tablet:grid-cols-3 ultrawide:grid-cols-6 gap-x-4 gap-y-2 md:gap-y-6",
        className
      )}
    >
      {cards.map((i, idx) => (
        <div
          key={`${i}_${idx}`}
          className="aspect-[1/1] w-full animate-shimmer rounded-small bg-gray-200 dark:bg-brand-250/50"
        />
      ))}
    </div>
  );
};

export default AudioTimelineShimmer;
