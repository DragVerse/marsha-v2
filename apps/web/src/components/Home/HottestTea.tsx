import { TAPE_APP_NAME } from "@dragverse/constants";

const HottestTea = () => {
  return (
    <div className="dragverse-border relative flex h-[300px] ultrawide:h-[400px] w-[300px] flex-none overflow-hidden rounded-large">
      <div className="absolute inset-0 z-[1] h-full w-full bg-gradient-to-b from-transparent via-brand-150/90 to-brand-250" />
      <div className="relative z-[2] flex h-full flex-col justify-end space-y-4 p-4 ultrawide:p-8 text-left text-white md:p-6">
        <div className="font-bold text-3xl">
          A portal into the {TAPE_APP_NAME} community
        </div>
        <p className="max-w-2xl text-sm md:text-md lg:text-lg">
          Celebrating the diverse and talented creators within our community. ✨
        </p>
      </div>
    </div>
  );
};

export default HottestTea;
