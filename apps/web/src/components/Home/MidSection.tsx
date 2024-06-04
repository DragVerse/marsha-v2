import HorizontalScroller from '@components/Common/HorizontalScroller'
import {
  ALLOWED_APP_IDS,
  INFINITE_SCROLL_ROOT_MARGIN,
  IS_MAINNET,
  TAPE_APP_ID
} from '@dragverse/constants'
import type { PrimaryPublication, PublicationsRequest } from '@dragverse/lens'
import {
  LimitType,
  PublicationMetadataMainFocusType,
  PublicationType,
  usePublicationsQuery
} from '@dragverse/lens'
import { Spinner } from '@dragverse/ui'
import useCuratedProfiles from '@lib/store/idb/curated'
import { useRef } from 'react'
import { useInView } from 'react-cool-inview'

import DragverseCommunity from './DragverseCommunity'
import HorizontalVideos from './HorizontalVideos'

const MidSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const curatedProfiles = useCuratedProfiles((state) => state.curatedProfiles)

  const request: PublicationsRequest = {
    where: {
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Video],
        publishedOn: IS_MAINNET ? [TAPE_APP_ID, ...ALLOWED_APP_IDS] : undefined
      },
      publicationTypes: [PublicationType.Post],
      from: curatedProfiles
    },
    limit: LimitType.Fifty
  }

  const { data, loading, error, fetchMore } = usePublicationsQuery({
    variables: { request },
    skip: !curatedProfiles?.length
  })

  const pageInfo = data?.publications?.pageInfo
  const videos = data?.publications?.items as unknown as PrimaryPublication[]

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
      })
    }
  })

  return (
    <div className="flex flex-col">
      <HorizontalScroller
        sectionRef={sectionRef}
        heading=""
        headingClassName="font-syne font-extrabold"
      />
      <div
        ref={sectionRef}
        className="no-scrollbar laptop:pt-6 relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth pt-4"
      >
        <DragverseCommunity />
        {loading && <Spinner />}
        {!error && !loading && videos?.length > 0 && (
          <div className="flex space-x-4">
            <HorizontalVideos videos={videos} />
          </div>
        )}
        {videos?.length === 0 && (
          <p className="text-center">No trending videos found.</p>
        )}
      </div>
    </div>
  )
}

export default MidSection
