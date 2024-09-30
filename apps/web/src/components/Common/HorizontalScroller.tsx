import { ChevronLeftOutline, ChevronRightOutline } from "@dragverse/ui";
import type { FC, RefObject } from "react";

type Props = {
  heading: string;
  headingClassName: string;
  sectionRef: RefObject<HTMLDivElement>;
};

const HorizontalScroller: FC<Props> = ({
  heading,
  sectionRef,
  headingClassName
}) => {
  const sectionOffsetWidth = sectionRef.current?.offsetWidth ?? 1000;
  const scrollOffset = sectionOffsetWidth / 1.2;

  const scroll = (offset: number) => {
    if (sectionRef.current) {
      sectionRef.current.scrollLeft += offset;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 text-xl">
        <h2 className={headingClassName}>{heading}</h2>
      </div>
      <div className="space-x-2">
        <button
          type="button"
          onClick={() => scroll(-scrollOffset)}
          className="rounded-full p-2 backdrop-blur-xl hover:bg-gallery focus:outline-none dark:hover:bg-smoke"
        >
          <ChevronLeftOutline className="size-4" />
          <span className="sr-only">Scroll Left</span>
        </button>
        <button
          type="button"
          onClick={() => scroll(scrollOffset)}
          className="rounded-full p-2 backdrop-blur-xl hover:bg-gallery focus:outline-none dark:hover:bg-smoke"
        >
          <ChevronRightOutline className="size-4" />
          <span className="sr-only">Scroll Right</span>
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroller;
