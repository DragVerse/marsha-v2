import Logo from "@/components/Common/Logo";
import MetaTags from "@/components/Common/MetaTags";
import Authenticate from "@/components/Login/Authenticate";
import Connectors from "@/components/Login/Connectors";
import useSw from "@/hooks/useSw";
import { EVENTS } from "@dragverse/generic";
import { usePrivy } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const BackgroundComets = dynamic(
  () => import("@/components/Login/BackgroundComets")
);

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, authenticated } = usePrivy();
  const address = user?.wallet?.address;
  const isConnected = authenticated && isAuthenticated && !!address;
  const { setTheme } = useTheme();
  setTheme("dark");
  const { addEventToQueue } = useSw();
  useEffect(() => {
    addEventToQueue(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.LOGIN });
  }, []);

  const handleAuthentication = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-brand-850 dark:bg-brand-850">
      <MetaTags title="🗝 Login to Dragverse" />
      <div className="grid h-full w-full place-items-center">
        <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between laptop:p-6 p-4 ultrawide:p-8">
          <Link href="/" passHref>
            <Logo />
          </Link>
        </div>
        <div className="dragverse-border container relative z-10 mx-auto max-w-md bg-opacity-50 p-10 backdrop-blur-sm dark:bg-inherit">
          <div className="mb-6">
            <h2 className="text-center font-bold text-2xl text-brand-200">
              Welcome to Dragverse
            </h2>
            <p className="text-center text-white">
              The most ✨ iconic ✨ version of yourself online
            </p>
          </div>
          {!isConnected ? (
            <Connectors onAuthenticated={handleAuthentication} />
          ) : (
            <Authenticate />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
