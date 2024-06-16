import HorizontalScroller from '@components/Common/HorizontalScroller'
import { useRef } from 'react'

import DecentralandAlert from './DecentralandAlert'
import DragverseWorlds from './DragverseWorlds'
import HyperfyAlert from './HyperfyAlert'
import SpatialAlert from './SpatialAlert'

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col">
      <HorizontalScroller
        sectionRef={sectionRef}
        heading=""
        headingClassName="font-syne font-extrabold"
      />
      <div
        ref={sectionRef}
        className="no-scrollbar laptop:pt-6 relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-6 pt-4" // Added pb-4 for bottom padding
      >
        <DragverseWorlds />
        <HyperfyAlert />
        <SpatialAlert />
        <DecentralandAlert />
      </div>
    </div>
  )
}

export default HeroSection
