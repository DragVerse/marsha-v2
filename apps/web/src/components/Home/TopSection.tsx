import HorizontalScroller from '@components/Common/HorizontalScroller'
import useProfileStore from '@lib/store/idb/profile'
import { useRef } from 'react'

import GitcoinAlert from './GitcoinAlert'
import LatestBytes from './LatestBytes'
import LensManagerAlert from './LensManagerAlert'
import WelcomeAlert from './WelcomeAlert'
import WelcomeSuccess from './WelcomeSuccess'

const TopSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { activeProfile } = useProfileStore()

  return (
    <div className="flex flex-col">
      <HorizontalScroller
        sectionRef={sectionRef}
        heading="Hottest Tea ☕"
        headingClassName="font-syne font-extrabold"
      />
      <div
        ref={sectionRef}
        className="no-scrollbar laptop:pt-6 relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth pt-4"
      >
        {!activeProfile?.id && <WelcomeAlert />}
        {activeProfile?.id && <WelcomeSuccess />}
        <GitcoinAlert />
        <LensManagerAlert />
        <LatestBytes />
      </div>
    </div>
  )
}

export default TopSection
