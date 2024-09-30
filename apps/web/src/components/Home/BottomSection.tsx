import { useRef } from "react";
import HorizontalScroller from "../Common/HorizontalScroller";
import HottestTea from "./HottestTea";
import LatestBytes from "./LatestBytes";

const BottomSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col">
      <HorizontalScroller
        sectionRef={sectionRef}
        heading=""
        headingClassName="font-dragverse font-extrabold"
      />
      <div
        ref={sectionRef}
        className="no-scrollbar relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth laptop:pt-6 pt-4 pb-6"
      >
        <HottestTea />
        <LatestBytes />
      </div>
    </div>
  );
};

export default BottomSection;
