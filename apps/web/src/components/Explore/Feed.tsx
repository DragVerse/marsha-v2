import useSw from "@/hooks/useSw";
import { getUnixTimestampNDaysAgo } from "@/lib/formatTime";
import useAppStore from "@/lib/store";
import { tw } from "@dragverse/browser";
import {
  ALLOWED_APP_IDS,
  INFINITE_SCROLL_ROOT_MARGIN,
  IS_MAINNET,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID
} from "@dragverse/constants";
import { EVENTS } from "@dragverse/generic";
import {
  CustomFiltersType,
  type ExplorePublicationRequest,
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  LimitType,
  type PrimaryPublication,
  PublicationMetadataMainFocusType,
  useExplorePublicationsQuery
} from "@dragverse/lens";
import {
  Button,
  CommentOutline,
  FireOutline,
  MirrorOutline,
  Spinner
} from "@dragverse/ui";
import { useState } from "react";
import { useInView } from "react-cool-inview";
import Timeline from "../Home/Timeline";
import TimelineShimmer from "../Shimmers/TimelineShimmer";
import { NoDataFound } from "../UIElements/NoDataFound";

const initialCriteria = {
  trending: true,
  popular: false,
  interesting: false
};

const since = getUnixTimestampNDaysAgo(30);

const ExploreFeed = () => {
  const [activeCriteria, setActiveCriteria] = useState(initialCriteria);
  const activeTagFilter = useAppStore((state) => state.activeTagFilter);
  const { addEventToQueue } = useSw();

  const getCriteria = () => {
    if (activeCriteria.trending) {
      return ExplorePublicationsOrderByType.TopCollectedOpenAction;
    }
    if (activeCriteria.popular) {
      return ExplorePublicationsOrderByType.TopCommented;
    }
    if (activeCriteria.interesting) {
      return ExplorePublicationsOrderByType.TopMirrored;
    }
    return ExplorePublicationsOrderByType.TopCollectedOpenAction;
  };

  const request: ExplorePublicationRequest = {
    where: {
      customFilters: [CustomFiltersType.Gardeners],
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        tags:
          activeTagFilter !== "all" ? { oneOf: [activeTagFilter] } : undefined,
        mainContentFocus: [PublicationMetadataMainFocusType.Video],
        publishedOn: IS_MAINNET
          ? [TAPE_APP_ID, LENSTUBE_BYTES_APP_ID, ...ALLOWED_APP_IDS]
          : undefined
      },
      since
    },
    orderBy: getCriteria(),
    limit: LimitType.Fifty
  };

  const { data, loading, error, fetchMore } = useExplorePublicationsQuery({
    variables: {
      request
    }
  });

  const videos = data?.explorePublications
    ?.items as unknown as PrimaryPublication[];
  const pageInfo = data?.explorePublications?.pageInfo;

  const { observe } = useInView({
    rootMargin: INFINITE_SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      });
    }
  });

  return (
    <div className="laptop:pt-6 pt-4">
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          className={tw(activeCriteria.trending && "border-brand-500")}
          onClick={() => {
            setActiveCriteria({ ...initialCriteria });
            addEventToQueue(EVENTS.PAGEVIEW, {
              page: EVENTS.PAGE_VIEW.EXPLORE_TRENDING
            });
          }}
          icon={<FireOutline className="size-5" />}
        >
          Trending
        </Button>
        <Button
          variant="secondary"
          className={tw(activeCriteria.popular && "border-brand-500")}
          onClick={() => {
            setActiveCriteria({
              ...initialCriteria,
              popular: true,
              trending: false
            });
            addEventToQueue(EVENTS.PAGEVIEW, {
              page: EVENTS.PAGE_VIEW.EXPLORE_POPULAR
            });
          }}
          icon={<CommentOutline className="size-5" />}
        >
          Popular
        </Button>
        <Button
          variant="secondary"
          className={tw(activeCriteria.interesting && "border-brand-500")}
          onClick={() => {
            setActiveCriteria({
              ...initialCriteria,
              interesting: true,
              trending: false
            });
            addEventToQueue(EVENTS.PAGEVIEW, {
              page: EVENTS.PAGE_VIEW.EXPLORE_INTERESTING
            });
          }}
          icon={<MirrorOutline className="size-5" />}
        >
          Interesting
        </Button>
      </div>

      <div className="my-4">
        {loading && <TimelineShimmer />}
        {videos?.length === 0 && (
          <NoDataFound isCenter withImage text="No videos found" />
        )}
        {!error && !loading && videos?.length ? (
          <>
            <Timeline videos={videos} />
            {pageInfo?.next && (
              <span ref={observe} className="flex justify-center p-10">
                <Spinner />
              </span>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ExploreFeed;
