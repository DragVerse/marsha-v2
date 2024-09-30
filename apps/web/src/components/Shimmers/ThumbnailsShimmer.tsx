import { useMemo } from "react";

import { THUMBNAIL_GENERATE_COUNT } from "@/components/Create/ChooseThumbnail";

const ThumbnailsShimmer = () => {
  const thumbnails = useMemo(() => Array(THUMBNAIL_GENERATE_COUNT).fill(1), []);

  return (
    <>
      {thumbnails.map((e, i) => (
        <div
          key={`${e}_${i}`}
          className="dragverse-border aspect-[16/9] h-full w-full animate-shimmer rounded-md"
        >
          <div className="h-full rounded-md bg-gray-200 dark:bg-brand-950" />
        </div>
      ))}
    </>
  );
};

export default ThumbnailsShimmer;
