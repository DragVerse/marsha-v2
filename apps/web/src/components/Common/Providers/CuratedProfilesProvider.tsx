import { TAPE_CURATOR_ID } from '@dragverse/constants'
import type { FollowingRequest } from '@dragverse/lens'
import { LimitType, useFollowingQuery } from '@dragverse/lens'
import useCuratedProfiles from '@lib/store/idb/curated'

const followingRequest: FollowingRequest = {
  for: TAPE_CURATOR_ID,
  limit: LimitType.Fifty
}

const CuratedProfilesProvider = () => {
  const setCuratedProfiles = useCuratedProfiles(
    (state) => state.setCuratedProfiles
  )

  useFollowingQuery({
    variables: { request: followingRequest },
    onCompleted: ({ following }) => {
      const followings = following?.items.map((p) => p.id)
      setCuratedProfiles(followings)
    }
  })

  return null
}

export default CuratedProfilesProvider
