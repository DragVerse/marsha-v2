import useSw from "@/hooks/useSw";
import { EVENTS } from "@dragverse/generic";
import { useEffect } from "react";
import CategoryFilters from "../Common/CategoryFilters";
import MetaTags from "../Common/MetaTags";
import ExploreFeed from "./Feed";

const Explore = () => {
  const { addEventToQueue } = useSw();

  useEffect(() => {
    addEventToQueue(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.EXPLORE });
  }, []);

  return (
    <div className="container mx-auto max-w-screen-ultrawide">
      <MetaTags title="Explore" />
      <CategoryFilters heading="Everything" />
      <ExploreFeed />
    </div>
  );
};

export default Explore;
