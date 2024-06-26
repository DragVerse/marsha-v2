import { getPublication, getPublicationData } from '@dragverse/generic'
import type { AnyPublication } from '@dragverse/lens'
import { getTimeFromSeconds } from '@lib/formatTime'
import type { FC } from 'react'

type Props = {
  video: AnyPublication
}

const ThumbnailOverlays: FC<Props> = ({ video }) => {
  const targetPublication = getPublication(video)
  const metadata = getPublicationData(targetPublication.metadata)
  const videoDuration = metadata?.asset?.duration

  if (!videoDuration) {
    return null
  }

  return (
    <div>
      <span className="bg-brand-850 absolute bottom-2 right-2 rounded px-1 py-0.5 text-xs font-bold text-white">
        {getTimeFromSeconds(String(videoDuration))}
      </span>
    </div>
  )
}

export default ThumbnailOverlays
