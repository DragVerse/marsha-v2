import Logo from "@/components/Common/Logo";
import MetaTags from "@/components/Common/MetaTags";
import { Button } from "@dragverse/ui";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <MetaTags title="Not found" />
      <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-4 text-center text-white">
        <Logo />
        <h1 className="font-bold font-dragverse text-4xl text-brand-500">
          404 👀 FASHION EMERGENCY
        </h1>
        <div className="mb-6 text-text">
          This page you are looking for could not be found. Maybe Drag Delusion?
          💅
        </div>
        <h1 className="font-bold text-4xl">404</h1>
        <div className="mb-6">This page could not be found.</div>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
