import { Button } from "@dragverse/ui";
import Link from "next/link";

const WelcomeBox = () => {
  return (
    <div className="dragverse-border relative flex h-[250px] ultrawide:h-[250px] w-[300px] flex-none overflow-hidden rounded-large">
      <div className="absolute inset-0 z-[1] h-full w-full bg-gradient-to-b from-transparent via-brand-400/60 to-brand-900" />
      <div className="relative z-[2] flex h-full flex-col justify-end space-y-4 p-4 ultrawide:p-8 text-left text-white md:p-6">
        <div className="font-bold font-dragverse text-3xl">Hi Darling</div>
        <p className="max-w-2xl text-sm md:text-md lg:text-lg">
          Login to Dragverse with your email, phone, socials, or 👛
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

export default WelcomeBox;
