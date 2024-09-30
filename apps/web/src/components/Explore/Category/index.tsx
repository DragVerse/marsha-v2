import MetaTags from "@/components/Common/MetaTags";
import Timeline from "@/components/Home/Timeline";
import TimelineShimmer from "@/components/Shimmers/TimelineShimmer";
import { NoDataFound } from "@/components/UIElements/NoDataFound";
import { getUnixTimestampNDaysAgo } from "@/lib/formatTime";
import Custom404 from "@/pages/404";
import {
  ALLOWED_APP_IDS,
  INFINITE_SCROLL_ROOT_MARGIN,
  IS_MAINNET,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID
} from "@dragverse/constants";
import { getCategoryName } from "@dragverse/generic";
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
import { Spinner } from "@dragverse/ui";
import { useRouter } from "next/router";
import { useInView } from "react-cool-inview";

const since = getUnixTimestampNDaysAgo(30);

const ExploreCategory = () => {
  const { query } = useRouter();
  const categoryName = query.category as string;

  const request: ExplorePublicationRequest = {
    where: {
      customFilters: [CustomFiltersType.Gardeners],
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        tags: { oneOf: [categoryName] },
        mainContentFocus: [PublicationMetadataMainFocusType.Video],
        publishedOn: IS_MAINNET
          ? [TAPE_APP_ID, LENSTUBE_BYTES_APP_ID, ...ALLOWED_APP_IDS]
          : undefined
      },
      since
    },
    orderBy: ExplorePublicationsOrderByType.Latest,
    limit: LimitType.Fifty
  };

  const { data, loading, error, fetchMore } = useExplorePublicationsQuery({
    variables: {
      request
    },
    skip: !query.category
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
            cursor: pageInfo?.next,
            ...request
          }
        }
      });
    }
  });
  if (!query.category) {
    return <Custom404 />;
  }

  return (
    <>
      <MetaTags title={categoryName?.toString() || ""} />
      <div>
        <h1 className="font-bold capitalize md:text-2xl">
          {getCategoryName(categoryName)}
        </h1>
        <div className="my-4">
          {loading && <TimelineShimmer />}
          {videos?.length === 0 && (
            <NoDataFound isCenter withImage text={"No videos found"} />
          )}
          {!error && !loading && (
            <>
              <Timeline videos={videos} />
              {pageInfo?.next && (
                <span ref={observe} className="flex justify-center p-10">
                  <Spinner />
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreCategory;
