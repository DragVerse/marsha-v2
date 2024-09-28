import useCuratedProfiles from "@/lib/store/idb/curated";
import {
  ALLOWED_APP_IDS,
  FALLBACK_THUMBNAIL_URL,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID,
  TAPE_BYTES_APP_ID
} from "@dragverse/constants";
import {
  getLennyPicture,
  getProfile,
  getProfilePicture,
  getPublicationData,
  getThumbnailUrl,
  imageCdn
} from "@dragverse/generic";
import {
  LimitType,
  type PrimaryPublication,
  PublicationMetadataMainFocusType,
  PublicationType,
  type PublicationsRequest,
  usePublicationsQuery
} from "@dragverse/lens";
import Link from "next/link";
import Badge from "../Common/Badge";
import HoverableProfile from "../Common/HoverableProfile";
import LatestBytesShimmer from "../Shimmers/LatestBytesShimmer";

const LatestBytes = () => {
  const curatedProfiles = useCuratedProfiles((state) => state.curatedProfiles);

  const request: PublicationsRequest = {
    where: {
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.ShortVideo],
        publishedOn: [
          TAPE_APP_ID,
          LENSTUBE_BYTES_APP_ID,
          TAPE_BYTES_APP_ID,
          ...ALLOWED_APP_IDS
        ]
      },
      publicationTypes: [PublicationType.Post],
      from: curatedProfiles
    },
    limit: LimitType.Fifty
  };

  const { data, error, loading } = usePublicationsQuery({
    variables: { request },
    skip: !curatedProfiles?.length
  });

  const bytes = data?.publications?.items as PrimaryPublication[];

  if (loading) {
    return <LatestBytesShimmer />;
  }

  if (!bytes?.length || error) {
    return null;
  }

  return (
    <>
      {bytes.map((byte) => {
        const thumbnailUrl = getThumbnailUrl(byte.metadata);
        return (
          <div className="flex flex-col" key={byte.id}>
            <Link
              href={`/bytes/${byte.id}`}
              className="relative aspect-[9/16] h-[350px] ultrawide:h-[400px] ultrawide:w-[260px] w-[220px] flex-none overflow-hidden rounded-large"
            >
              <img
                className="h-full object-cover"
                src={thumbnailUrl ? imageCdn(thumbnailUrl, "THUMBNAIL_V") : ""}
                alt="thumbnail"
                height={1000}
                width={600}
                draggable={false}
                onError={({ currentTarget }) => {
                  currentTarget.src = FALLBACK_THUMBNAIL_URL;
                }}
              />
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-black px-4 py-2">
                <h1 className="line-clamp-2 break-all font-bold text-white">
                  {getPublicationData(byte.metadata)?.title}
                </h1>
              </div>
            </Link>
            <span>
              <HoverableProfile profile={byte.by} key={byte.by?.id}>
                <Link
                  href={getProfile(byte.by)?.link}
                  className="inline-flex items-center space-x-1 px-3 py-1"
                >
                  <img
                    className="size-4 rounded-full bg-gray-200 dark:bg-gray-800"
                    src={getProfilePicture(byte.by, "AVATAR")}
                    height={50}
                    width={50}
                    alt={`${getProfile(byte.by)?.slug}'s PFP`}
                    draggable={false}
                    onError={({ currentTarget }) => {
                      currentTarget.src = getLennyPicture(byte.by?.id);
                    }}
                  />
                  <span className="flex items-center space-x-1 font-medium">
                    <span>{getProfile(byte.by)?.slug}</span>
                    <Badge id={byte.by.id} size="xs" />
                  </span>
                </Link>
              </HoverableProfile>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default LatestBytes;
