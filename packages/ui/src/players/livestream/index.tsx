import { LIVEPEER_STUDIO_API_KEY } from '@dragverse/constants'
import type { FC } from 'react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import type { PlayerProps } from './Player'
import PlayerInstance from './Player'
import SensitiveWarning from './SensitiveWarning'

interface Props extends PlayerProps {
  url: string
  currentTime?: number
  isSensitiveContent?: boolean
  refCallback?: (ref: HTMLMediaElement) => void
}

export const LivestreamPlayer: FC<Props> = memo(function LivestreamPlayer({
  url,
  address,
  options,
  posterUrl,
  refCallback,
  ratio = '16to9',
  currentTime = 0,
  isSensitiveContent,
  showControls = true,
  shouldUpload,
  playbackId,
  streamId
}) {
  const [showLivestream, setShowLivestream] = useState<boolean>(false)
  const playerRef = useRef<HTMLMediaElement>()
  const [sensitiveWarning, setSensitiveWarning] = useState(isSensitiveContent)

  const mediaElementRef = useCallback((ref: HTMLMediaElement) => {
    refCallback?.(ref)
    playerRef.current = ref
    playerRef.current.currentTime = Number(currentTime || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!playerRef.current) {
      return
    }
    playerRef.current.currentTime = Number(currentTime || 0)
  }, [currentTime])

  const onContextClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const checkStreamActive = async (streamId: string) => {
    const response = await fetch(
      `https://livepeer.studio/api/stream/${streamId}`,
      {
        headers: {
          Authorization: `Bearer ${LIVEPEER_STUDIO_API_KEY}`
        }
      }
    )
    if (response.ok) {
      const session = await response.json()
      return session.isActive
    } else {
      console.error(`Failed to fetch session: ${response.statusText}`)
      return false
    }
  }

  useEffect(() => {
    if (!streamId) {
      return
    }
    checkStreamActive(streamId).then((isActive) => {
      console.log('livestream isActive', isActive)
      setShowLivestream(isActive)
    })
  }, [streamId])

  return (
    <div className={`w-full ${options.maxHeight && 'h-full'}`}>
      {showLivestream ? (
        sensitiveWarning ? (
          <SensitiveWarning acceptWarning={() => setSensitiveWarning(false)} />
        ) : (
          <div
            onContextMenu={onContextClick}
            className={`relative flex ${options.maxHeight && 'h-full'} h-full w-full p-12`}
          >
            <PlayerInstance
              ratio={ratio}
              url={url}
              options={options}
              address={address}
              posterUrl={posterUrl}
              playerRef={mediaElementRef}
              showControls={showControls}
              shouldUpload={shouldUpload}
              playbackId={playbackId}
            />
          </div>
        )
      ) : (
        <> </>
      )}
    </div>
  )
})
