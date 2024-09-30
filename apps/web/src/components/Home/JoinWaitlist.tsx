import { Button } from "@dragverse/ui";
import Link from "next/link";

const WelcomeSuccess = () => {
  return (
    <div className="dragverse-border relative flex h-[350px] ultrawide:h-[400px] w-full flex-none overflow-hidden rounded-large sm:w-[300px] lg:w-[500px]">
      <div className="absolute inset-0 h-full w-full bg-brand-250" />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-brand-900 to-transparent" />
      <div className="relative flex h-full flex-col justify-end space-y-4 p-4 ultrawide:p-8 text-left text-white md:p-6">
        <div className="font-bold text-3xl">
          You are in⚡ It's giving Digital Drag Delusion
        </div>
        <p className="max-w-2xl text-sm md:text-md lg:text-lg">
          Thank you for exploring our community app! Please remember our app is
          on BETA and some things might now work as expected. If you have any
          questions:
        </p>
        <div className="flex gap-3">
          <Link href="https://app.console.xyz/c/dragverse">
            <Button>Join Console Kiki</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSuccess;
