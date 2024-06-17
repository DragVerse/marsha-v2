import { imageCdn, sanitizeDStorageUrl } from '@dragverse/generic'
import { LivestreamPlayer } from '@dragverse/ui'
import type { FC } from 'react'
import { memo } from 'react'

type Props = {
  video: {
    playbackUrl: string
    playbackId: string
    thumbnailUrl: string
    streamId: string
  }
}

const RenderLivestream = memo(function ({
  video
}: {
  video: {
    playbackUrl: string
    playbackId: string
    thumbnailUrl: string
    streamId: string
  }
}) {
  const { playbackId, playbackUrl, thumbnailUrl, streamId } = video
  const sanitizedThumbnailUrl = imageCdn(
    sanitizeDStorageUrl(thumbnailUrl),
    'THUMBNAIL'
  )
  const sanitizedVideoUrl = sanitizeDStorageUrl(playbackUrl)

  const refCallback = (ref: HTMLMediaElement) => {
    if (ref) {
      ref.autoplay = true
    }
  }

  return (
    <div className="rounded-large overflow-hidden">
      <LivestreamPlayer
        refCallback={refCallback}
        url={sanitizedVideoUrl}
        posterUrl={sanitizedThumbnailUrl}
        options={{
          loadingSpinner: true,
          isCurrentlyShown: true
        }}
        playbackId={playbackId}
        streamId={streamId}
      />
    </div>
  )
})
RenderLivestream.displayName = 'RenderLivestream'

const Livestream: FC<Props> = ({ video }) => {
  return (
    <div>
      <RenderLivestream video={video} />
    </div>
  )
}

export default memo(Livestream)
