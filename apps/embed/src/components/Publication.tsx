'use client'

import {
  getLivepeerClient,
  setFingerprint,
  tapeFont,
  videoPlayerTheme
} from '@dragverse/browser'
import { getPublication } from '@dragverse/generic'
import type { AnyPublication } from '@dragverse/lens'
import { LivepeerConfig } from '@livepeer/react'
import type { FC } from 'react'
import { useEffect } from 'react'

import Video from './Video'

type Props = {
  publication: AnyPublication
}

const Publication: FC<Props> = ({ publication }) => {
  useEffect(() => {
    setFingerprint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const target = getPublication(publication)

  return (
    <div className={tapeFont.className}>
      <LivepeerConfig client={getLivepeerClient()} theme={videoPlayerTheme}>
        <Video video={target} />
      </LivepeerConfig>
    </div>
  )
}

export default Publication
