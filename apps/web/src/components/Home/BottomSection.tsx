import HorizontalScroller from '@components/Common/HorizontalScroller'
import useProfileStore from '@lib/store/idb/profile'
import { useRef } from 'react'

import EngageBox from './EngageBox'
import EnjoyBox from './EnjoyBox'
import ExploreBox from './ExploreBox'
import LogoHero from './LogoHero'
import WelcomeBox from './WelcomeBox'
import WelcomeSuccess from './WelcomeSuccess'
import WelcomeSuccessBox from './WelcomeSuccessBox'

const BottomSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const activeProfile = useProfileStore((state) => state.activeProfile)

  return (
    <div className="flex flex-col">
      <HorizontalScroller
        sectionRef={sectionRef}
        heading=""
        headingClassName="font-syne font-extrabold"
      />
      <div
        ref={sectionRef}
        className="no-scrollbar laptop:pt-6 relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth pt-6"
      >
        <LogoHero />
        {!activeProfile?.id && <WelcomeBox />}
        {activeProfile?.id && <WelcomeSuccessBox />}
        <WelcomeSuccess />
        <ExploreBox />
        <EnjoyBox />
        <EngageBox />
      </div>
    </div>
  )
}

export default BottomSection
