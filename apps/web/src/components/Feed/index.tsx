import useSw from "@/hooks/useSw";
import useAppStore from "@/lib/store";
import useProfileStore from "@/lib/store/idb/profile";
import Custom500 from "@/pages/500";
import {
  INFINITE_SCROLL_ROOT_MARGIN,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID
} from "@dragverse/constants";
import { EVENTS } from "@dragverse/generic";
import {
  FeedEventItemType,
  type FeedItem,
  type FeedRequest,
  type PrimaryPublication,
  PublicationMetadataMainFocusType,
  useFeedQuery
} from "@dragverse/lens";
import { Spinner } from "@dragverse/ui";
import { useEffect } from "react";
import { useInView } from "react-cool-inview";
import CategoryFilters from "../Common/CategoryFilters";
import MetaTags from "../Common/MetaTags";
import VideoCard from "../Common/VideoCard";
import TimelineShimmer from "../Shimmers/TimelineShimmer";
import { NoDataFound } from "../UIElements/NoDataFound";

const Feed = () => {
  const { activeProfile } = useProfileStore();
  const { addEventToQueue } = useSw();
  const activeTagFilter = useAppStore((state) => state.activeTagFilter);

  useEffect(() => {
    addEventToQueue(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.FEED });
  }, []);

  const request: FeedRequest = {
    where: {
      feedEventItemTypes: [FeedEventItemType.Post],
      for: activeProfile?.id,
      metadata: {
        publishedOn: [TAPE_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID],
        tags:
          activeTagFilter !== "all" ? { oneOf: [activeTagFilter] } : undefined,
        mainContentFocus: [PublicationMetadataMainFocusType.Video]
      }
    }
  };

  const { data, loading, error, fetchMore } = useFeedQuery({
    variables: {
      request
    },
    skip: !activeProfile?.id
  });

  const feedItems = data?.feed?.items as FeedItem[];
  const pageInfo = data?.feed?.pageInfo;

  const { observe } = useInView({
    rootMargin: INFINITE_SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            cursor: pageInfo?.next,
            ...request
          }
        }
      });
    }
  });

  if (!loading && error) {
    return <Custom500 />;
  }

  return (
    <div className="container mx-auto max-w-screen-ultrawide">
      <MetaTags title="Your Feed" />
      <CategoryFilters heading="Your Feed" />
      {loading && <TimelineShimmer className="laptop:pt-6 pt-4" />}
      {!loading && !feedItems?.length ? (
        <NoDataFound
          className="my-20"
          isCenter
          withImage
          text="Oh no! It seems you need to connect with other drag creators and community members around the network."
        />
      ) : null}
      {!error && !loading && (
        <>
          <div className="grid-col-1 grid desktop:grid-cols-4 tablet:grid-cols-3 ultrawide:grid-cols-6 gap-x-4 gap-y-2 laptop:pt-6 pt-4 md:gap-y-6">
            {feedItems?.map((feedItem: FeedItem) => {
              const video = feedItem.root;
              return (
                <VideoCard
                  key={video?.id}
                  video={video as PrimaryPublication}
                />
              );
            })}
          </div>
          {pageInfo?.next && (
            <span ref={observe} className="flex justify-center p-10">
              <Spinner />
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
