import HorizontalScroller from '@components/Common/HorizontalScroller'
import { useRef } from 'react'

import HottestTea from './HottestTea'
import LatestBytes from './LatestBytes'

const BottomSection = () => {
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
        className="no-scrollbar laptop:pt-6 relative flex items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-6 pt-4"
      >
        <HottestTea />
        <LatestBytes />
      </div>
    </div>
  )
}

export default BottomSection
