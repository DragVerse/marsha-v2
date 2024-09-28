import { tw } from "@dragverse/browser";

const ButtonShimmer = ({ className = "h-10" }) => {
  return (
    <div className="w-full animate-shimmer">
      <div
        className={tw(
          "w-full rounded-lg bg-gray-200 dark:bg-brand-250/50",
          className
        )}
      />
    </div>
  );
};

export default ButtonShimmer;
