import VideoCard from '@components/Common/VideoCard'
import { getPublication } from '@dragverse/generic'
import type { AnyPublication } from '@dragverse/lens'
import type { FC } from 'react'

type Props = {
  videos: AnyPublication[]
}

const HorizontalVideos: FC<Props> = ({ videos }) => {
  return (
    <div className="no-scrollbar flex h-full space-x-4 overflow-x-auto">
      {videos?.map((video: AnyPublication, i) => {
        const targetPublication = getPublication(video)
        return (
          <div key={`${video?.id}_${i}`} className="w-80 flex-shrink-0">
            <VideoCard video={targetPublication} />
          </div>
        )
      })}
    </div>
  )
}

export default HorizontalVideos
