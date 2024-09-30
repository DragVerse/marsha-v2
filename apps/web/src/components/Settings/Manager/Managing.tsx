import Badge from "@/components/Common/Badge";
import { NoDataFound } from "@/components/UIElements/NoDataFound";
import useProfileStore from "@/lib/store/idb/profile";
import { INFINITE_SCROLL_ROOT_MARGIN } from "@dragverse/constants";
import {
  formatNumber,
  getLennyPicture,
  getProfile,
  getProfileCoverPicture,
  getProfilePicture,
  imageCdn,
  sanitizeDStorageUrl
} from "@dragverse/generic";
import {
  type Profile,
  type ProfilesManagedRequest,
  useProfilesManagedQuery
} from "@dragverse/lens";
import { Spinner } from "@dragverse/ui";
import Link from "next/link";
import { useInView } from "react-cool-inview";

const Managing = () => {
  const activeProfile = useProfileStore(
    (state) => state.activeProfile
  ) as Profile;
  const { address } = getProfile(activeProfile);

  const request: ProfilesManagedRequest = { for: address };
  const { data, loading, error, fetchMore } = useProfilesManagedQuery({
    variables: { request, lastLoggedInProfileRequest: { for: address } },
    skip: !address
  });
  const profilesManaged = data?.profilesManaged.items as Profile[];
  const pageInfo = data?.profilesManaged?.pageInfo;

  const { observe } = useInView({
    threshold: 0.25,
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
    <div>
      <p>Profiles managed by your wallet account.</p>
      <div className="mt-3">
        {loading && <Spinner className="my-10" />}
        {(!loading && !profilesManaged?.length) || error ? (
          <NoDataFound withImage isCenter />
        ) : null}
        {profilesManaged?.length ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {profilesManaged?.map((profile) => (
              <div
                key={profile.id}
                className="dragverse-border overflow-hidden rounded-small"
              >
                <div
                  style={{
                    backgroundImage: `url(${imageCdn(
                      sanitizeDStorageUrl(getProfileCoverPicture(profile, true))
                    )})`
                  }}
                  className="relative h-20 w-full bg-brand-500 bg-center bg-cover bg-no-repeat"
                >
                  <div className="absolute bottom-3 left-3 flex-none">
                    <img
                      className="size-10 rounded-full border-2 border-white bg-white object-cover dark:bg-gray-900"
                      src={getProfilePicture(profile, "AVATAR")}
                      alt={getProfile(profile)?.displayName}
                      draggable={false}
                      onError={({ currentTarget }) => {
                        currentTarget.src = getLennyPicture(profile?.id);
                      }}
                    />
                  </div>
                </div>
                <div className="px-3 py-2.5">
                  <Link
                    href={getProfile(profile)?.link}
                    className="flex items-center space-x-1"
                  >
                    <span className="font-bold text-2xl leading-tight">
                      {getProfile(profile)?.slug}
                    </span>
                    <Badge id={profile?.id} size="lg" />
                  </Link>
                  <span>{formatNumber(profile.stats.followers)} followers</span>
                  {profile.metadata?.bio && (
                    <div className="line-clamp-2 py-2">
                      {profile.metadata?.bio}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {pageInfo?.next && (
          <span ref={observe} className="flex justify-center p-10">
            <Spinner />
          </span>
        )}
      </div>
    </div>
  );
};

export default Managing;
