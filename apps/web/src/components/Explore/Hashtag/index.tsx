import MetaTags from "@/components/Common/MetaTags";
import Timeline from "@/components/Home/Timeline";
import TimelineShimmer from "@/components/Shimmers/TimelineShimmer";
import { NoDataFound } from "@/components/UIElements/NoDataFound";
import Custom404 from "@/pages/404";
import {
  ALLOWED_APP_IDS,
  INFINITE_SCROLL_ROOT_MARGIN,
  IS_MAINNET,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID
} from "@dragverse/constants";
import {
  CustomFiltersType,
  LimitType,
  type PrimaryPublication,
  PublicationMetadataMainFocusType,
  type PublicationSearchRequest,
  useSearchPublicationsQuery
} from "@dragverse/lens";
import { Spinner } from "@dragverse/ui";
import { useRouter } from "next/router";
import { useInView } from "react-cool-inview";

const ExploreHashtag = () => {
  const { query } = useRouter();
  const hashtag = query.hashtag as string;

  const request: PublicationSearchRequest = {
    where: {
      metadata: {
        publishedOn: IS_MAINNET
          ? [TAPE_APP_ID, LENSTUBE_BYTES_APP_ID, ...ALLOWED_APP_IDS]
          : undefined,
        mainContentFocus: [PublicationMetadataMainFocusType.Video]
      },
      customFilters: [CustomFiltersType.Gardeners]
    },
    query: hashtag,
    limit: LimitType.Fifty
  };

  const { data, loading, error, fetchMore } = useSearchPublicationsQuery({
    variables: {
      request
    },
    skip: !hashtag
  });

  const videos = data?.searchPublications
    ?.items as unknown as PrimaryPublication[];
  const pageInfo = data?.searchPublications?.pageInfo;

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

  if (!hashtag) {
    return <Custom404 />;
  }

  return (
    <>
      <MetaTags title={hashtag?.toString()} />
      <div>
        <h1 className="font-bold md:text-2xl">#{hashtag}</h1>
        <div className="my-4">
          {loading && <TimelineShimmer />}
          {videos?.length === 0 && (
            <NoDataFound isCenter withImage text="No videos found" />
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

export default ExploreHashtag;
