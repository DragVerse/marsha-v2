import { useRef } from "react";

import HorizontalScroller from "@/components/Common/HorizontalScroller";
import useProfileStore from "@/lib/store/idb/profile";

import EngageBox from "./EngageBox";
import EnjoyBox from "./EnjoyBox";
import ExploreBox from "./ExploreBox";
import WelcomeSuccess from "./JoinWaitlist";
import LogoHero from "./LogoHero";
import WelcomeBox from "./WelcomeBox";

const TopSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeProfile } = useProfileStore();

  return (
    <div className="flex flex-col">
      <HorizontalScroller
        sectionRef={sectionRef}
        heading=""
        headingClassName="font-dragverse font-extrabold"
      />
      <div
        ref={sectionRef}
        className="no-scrollbar relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth laptop:pt-6 pt-4"
      >
        <LogoHero />
        {!activeProfile?.id && <WelcomeBox />}
        {activeProfile?.id && <WelcomeSuccess />}
        <ExploreBox />
        <EnjoyBox />
        <EngageBox />
      </div>
    </div>
  );
};

export default TopSection;
