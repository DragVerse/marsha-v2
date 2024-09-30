import { NoDataFound } from "@/components/UIElements/NoDataFound";
import useSw from "@/hooks/useSw";
import { tw, useDebounce, useOutsideClick } from "@dragverse/browser";
import {
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID,
  TAPE_BYTES_APP_ID
} from "@dragverse/constants";
import { EVENTS } from "@dragverse/generic";
import type {
  PrimaryPublication,
  Profile,
  ProfileSearchRequest,
  PublicationSearchRequest
} from "@dragverse/lens";
import {
  CustomFiltersType,
  LimitType,
  PublicationMetadataMainFocusType,
  SearchPublicationType,
  useSearchProfilesLazyQuery,
  useSearchPublicationsLazyQuery
} from "@dragverse/lens";
import { Input, SearchOutline, Spinner } from "@dragverse/ui";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Profiles from "./Profiles";
import Publications from "./Publications";

const GlobalSearch = () => {
  const { setTheme } = useTheme();
  setTheme("dark");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { addEventToQueue } = useSw();

  const debouncedValue = useDebounce<string>(keyword, 500);
  const resultsRef = useRef(null);
  useOutsideClick(resultsRef, () => {
    setKeyword("");
    setShowSearchBar(false);
  });

  const [
    searchPublications,
    { data: publicationsData, loading: publicationsLoading }
  ] = useSearchPublicationsLazyQuery();

  const [searchProfiles, { data: profilesData, loading: profilesLoading }] =
    useSearchProfilesLazyQuery();

  const publicationSearchRequest: PublicationSearchRequest = {
    limit: LimitType.Ten,
    query: keyword,
    where: {
      metadata: {
        mainContentFocus: [
          PublicationMetadataMainFocusType.Video,
          PublicationMetadataMainFocusType.ShortVideo
        ],
        publishedOn: [
          TAPE_APP_ID,
          TAPE_BYTES_APP_ID,
          LENSTUBE_APP_ID,
          LENSTUBE_BYTES_APP_ID
        ]
      },
      publicationTypes: [SearchPublicationType.Post],
      customFilters: [CustomFiltersType.Gardeners]
    }
  };

  const profileSearchRequest: ProfileSearchRequest = {
    limit: LimitType.Ten,
    query: keyword,
    where: {
      customFilters: [CustomFiltersType.Gardeners]
    }
  };

  const onDebounce = () => {
    if (keyword.trim().length) {
      searchPublications({
        variables: {
          request: publicationSearchRequest
        }
      });
      searchProfiles({
        variables: {
          request: profileSearchRequest
        }
      });
      addEventToQueue(EVENTS.SEARCH);
    }
  };

  const profiles = profilesData?.searchProfiles?.items as Profile[];
  const publications = publicationsData?.searchPublications
    ?.items as unknown as PrimaryPublication[];

  useEffect(() => {
    onDebounce();
  }, [debouncedValue]);

  const Trigger = () => (
    <button
      type="button"
      className="rounded-full bg-brand-250 p-2.5 outline-none dark:bg-brand-250"
      onClick={() => setShowSearchBar(true)}
    >
      <SearchOutline className="size-3.5 text-white" />
      <span className="sr-only">Search</span>
    </button>
  );

  const Content = () => (
    <div className="-top-[18px] absolute right-0 z-20 laptop:w-[800px] w-[250px] rounded-full">
      <Input
        autoFocus
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search"
        className="bg-black focus:text-white focus:outline-brand-400"
      />
      <div
        className={tw(
          "dragverse-border no-scrollbar top-10 z-10 mt-1 w-full overflow-y-auto rounded-medium bg-black text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none md:absolute dark:bg-black",
          { hidden: debouncedValue.length === 0 }
        )}
        style={{ top: "100%" }} // Adjust the top position for mobile
      >
        <div style={{ maxHeight: "80vh" }}>
          <div className="p-4">
            {profilesLoading || publicationsLoading ? (
              <div className="flex justify-center p-5">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="space-y-2 pb-2 text-white focus:outline-none">
                  <span className="font-bold">Creators</span>
                  {profiles?.length ? (
                    <Profiles
                      results={profiles}
                      loading={profilesLoading}
                      clearSearch={() => {
                        setShowSearchBar(false);
                        setKeyword("");
                      }}
                    />
                  ) : (
                    <NoDataFound isCenter />
                  )}
                </div>
                <div className="space-y-2 focus:outline-none">
                  <span className="font-bold">Releases</span>
                  {publications?.length ? (
                    <Publications
                      results={publications}
                      loading={publicationsLoading}
                      clearSearch={() => {
                        setShowSearchBar(false);
                        setKeyword("");
                      }}
                    />
                  ) : (
                    <NoDataFound isCenter />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="relative" ref={resultsRef}>
        {showSearchBar ? <Content /> : <Trigger />}
      </div>
    </div>
  );
};

export default GlobalSearch;
