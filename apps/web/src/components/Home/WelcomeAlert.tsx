import { TAPE_APP_NAME } from "@dragverse/constants";
import { Button } from "@dragverse/ui";
import Link from "next/link";

const WelcomeAlert = () => {
  return (
    <div className="dragverse-border relative flex h-[350px] ultrawide:h-[400px] w-full flex-none overflow-hidden rounded-large sm:w-[300px] lg:w-[500px]">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-brand-900 to-transparent" />
      <div className="relative flex h-full flex-col justify-end space-y-4 p-4 ultrawide:p-8 text-left text-white md:p-6">
        <div className="font-bold text-3xl">Welcome to {TAPE_APP_NAME}</div>
        <p className="max-w-2xl text-sm md:text-md lg:text-lg">
          Purse first! 👛 Connect your wallet, confirm you have a Lens account,
          🗝 and interact with content from the most fabulous community on the
          intern3t!🌈✨.
        </p>
        <div className="flex gap-3">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAlert;
