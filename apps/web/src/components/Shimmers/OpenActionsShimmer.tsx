import { useMemo } from "react";

const OpenActionsShimmer = () => {
  const cards = useMemo(() => Array(10).fill(1), []);
  return (
    <>
      <div className="my-3 animate-shimmer">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-24 rounded-xl md:w-44">
            <div className="rounded-lg bg-gray-200 px-4 py-3 dark:bg-brand-950" />
          </div>
        </div>
        <div className="grid-col-1 grid laptop:grid-cols-4 gap-x-4 gap-y-2 md:grid-cols-2 md:gap-y-8 2xl:grid-cols-5">
          {cards.map((i, idx) => (
            <div className="w-full rounded-xl" key={`${i}_${idx}`}>
              <div className="flex animate-shimmer flex-col">
                <div className="aspect-h-9 aspect-w-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
                <div className="flex space-x-2 py-3">
                  <div className="flex-1 space-y-2 py-1">
                    <span className="space-y-2">
                      <div className="h-2 rounded bg-gray-200 dark:bg-brand-950" />
                      <div className="h-2 rounded bg-gray-200 dark:bg-brand-950" />
                    </span>
                    <div>
                      <div className="grid grid-cols-3">
                        <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-brand-950" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-8 border-theme border-opacity-10 dark:border-gray-800" />
    </>
  );
};

export default OpenActionsShimmer;
