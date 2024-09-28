import useAppStore from "@/lib/store";
import useCuratedProfiles from "@/lib/store/idb/curated";
import {
  ALLOWED_APP_IDS,
  INFINITE_SCROLL_ROOT_MARGIN,
  IS_MAINNET,
  TAPE_APP_ID
} from "@dragverse/constants";
import {
  LimitType,
  type PrimaryPublication,
  PublicationMetadataMainFocusType,
  PublicationType,
  type PublicationsRequest,
  usePublicationsQuery
} from "@dragverse/lens";
import { Spinner } from "@dragverse/ui";
import { useInView } from "react-cool-inview";
import CategoryFilters from "../Common/CategoryFilters";
import TimelineShimmer from "../Shimmers/TimelineShimmer";
import { NoDataFound } from "../UIElements/NoDataFound";
import Timeline from "./Timeline";

const Feed = ({ showFilter = true }: { showFilter?: boolean }) => {
  const activeTagFilter = useAppStore((state) => state.activeTagFilter);
  const curatedProfiles = useCuratedProfiles((state) => state.curatedProfiles);

  const request: PublicationsRequest = {
    where: {
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Video],
        publishedOn: IS_MAINNET ? [TAPE_APP_ID, ...ALLOWED_APP_IDS] : undefined,
        tags:
          activeTagFilter !== "all" ? { oneOf: [activeTagFilter] } : undefined
      },
      publicationTypes: [PublicationType.Post],
      from: curatedProfiles
    },
    limit: LimitType.Fifty
  };

  const { data, loading, error, fetchMore } = usePublicationsQuery({
    variables: { request },
    skip: !curatedProfiles?.length
  });

  const pageInfo = data?.publications?.pageInfo;
  const videos = data?.publications?.items as unknown as PrimaryPublication[];

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
    <div className="space-y-4 laptop:pt-6 pt-4">
      {showFilter && <CategoryFilters />}
      <div>
        {loading && <TimelineShimmer />}
        {!error && !loading && videos?.length > 0 && (
          <>
            <Timeline videos={videos} />
            {pageInfo?.next && (
              <span ref={observe} className="flex justify-center p-10">
                <Spinner />
              </span>
            )}
          </>
        )}
        {videos?.length === 0 && (
          <NoDataFound isCenter withImage text="No videos found" />
        )}
      </div>
    </div>
  );
};

export default Feed;
