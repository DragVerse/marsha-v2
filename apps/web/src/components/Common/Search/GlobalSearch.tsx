import { NoDataFound } from '@components/UIElements/NoDataFound'
import { tw, useDebounce, useOutsideClick } from '@dragverse/browser'
import {
  LENS_CUSTOM_FILTERS,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  TAPE_APP_ID,
  TAPE_BYTES_APP_ID
} from '@dragverse/constants'
import { EVENTS, Tower } from '@dragverse/generic'
import type {
  PrimaryPublication,
  Profile,
  ProfileSearchRequest,
  PublicationSearchRequest
} from '@dragverse/lens'
import {
  LimitType,
  PublicationMetadataMainFocusType,
  SearchPublicationType,
  useSearchProfilesLazyQuery,
  useSearchPublicationsLazyQuery
} from '@dragverse/lens'
import { Input, SearchOutline, Spinner } from '@dragverse/ui'
import { useEffect, useRef, useState } from 'react'

import Profiles from './Profiles'
import Publications from './Publications'

const GlobalSearch = () => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [keyword, setKeyword] = useState('')

  const debouncedValue = useDebounce<string>(keyword, 500)
  const resultsRef = useRef(null)
  useOutsideClick(resultsRef, () => {
    setKeyword('')
    setShowSearchBar(false)
  })

  const [
    searchPublications,
    { data: publicationsData, loading: publicationsLoading }
  ] = useSearchPublicationsLazyQuery()

  const [searchProfiles, { data: profilesData, loading: profilesLoading }] =
    useSearchProfilesLazyQuery()

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
      customFilters: LENS_CUSTOM_FILTERS
    }
  }

  const profileSearchRequest: ProfileSearchRequest = {
    limit: LimitType.Ten,
    query: keyword,
    where: {
      customFilters: LENS_CUSTOM_FILTERS
    }
  }

  const onDebounce = () => {
    if (keyword.trim().length) {
      searchPublications({
        variables: {
          request: publicationSearchRequest
        }
      })
      searchProfiles({
        variables: {
          request: profileSearchRequest
        }
      })
      Tower.track(EVENTS.SEARCH)
    }
  }

  const profiles = profilesData?.searchProfiles?.items as Profile[]
  const publications = publicationsData?.searchPublications
    ?.items as unknown as PrimaryPublication[]

  useEffect(() => {
    onDebounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const Trigger = () => (
    <button
      className="dark:bg-brand-250 rounded-full bg-gray-100 p-2.5 outline-none"
      onClick={() => setShowSearchBar(true)}
    >
      <SearchOutline className="size-3.5" />
      <span className="sr-only">Search</span>
    </button>
  )

  const Content = () => (
    <div className="laptop:w-[800px] absolute -top-[18px] right-0 z-20 w-[250px] rounded-full">
      <Input
        autoFocus
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search"
      />
      <div
        className={tw(
          'rounded-medium tape-border no-scrollbar dark:bg-brand-850 top-10 z-10 mt-1 w-full overflow-y-auto bg-white text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none md:absolute',
          { hidden: debouncedValue.length === 0 }
        )}
        style={{ top: '100%' }} // Adjust the top position for mobile
      >
        <div style={{ maxHeight: '80vh' }}>
          <div className="p-4">
            {profilesLoading || publicationsLoading ? (
              <div className="flex justify-center p-5">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="space-y-2 pb-2 focus:outline-none">
                  <span className="font-bold">Creators</span>
                  {profiles?.length ? (
                    <Profiles
                      results={profiles}
                      loading={profilesLoading}
                      clearSearch={() => setKeyword('')}
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
                      clearSearch={() => setKeyword('')}
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
  )

  return (
    <div>
      <div className="relative" ref={resultsRef}>
        {showSearchBar ? <Content /> : <Trigger />}
      </div>
    </div>
  )
}

export default GlobalSearch
