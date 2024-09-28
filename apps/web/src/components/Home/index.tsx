import useSw from "@/hooks/useSw";
import { EVENTS } from "@dragverse/generic";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import BottomSection from "./BottomSection";
import HeroSection from "./HeroSection";
import MidSection from "./MidSection";
import TopSection from "./TopSection";

const Home: NextPage = () => {
  const { setTheme } = useTheme();
  setTheme("dark");

  const { addEventToQueue } = useSw();

  useEffect(() => {
    addEventToQueue(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.HOME });
  }, []);

  return (
    <div className="container mx-auto max-w-screen-ultrawide">
      <TopSection />
      <HeroSection />
      <MidSection />
      <BottomSection />
    </div>
  );
};

export default Home;
