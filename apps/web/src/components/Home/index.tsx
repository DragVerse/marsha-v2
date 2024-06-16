import { EVENTS, Tower } from '@dragverse/generic'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

import BottomSection from './BottomSection'
import HeroSection from './HeroSection'
import MidSection from './MidSection'
import TopSection from './TopSection'

const Home: NextPage = () => {
  useEffect(() => {
    Tower.track(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.HOME })
  }, [])
  const { setTheme } = useTheme()
  setTheme('dark')

  return (
    <div className="max-w-screen-ultrawide container mx-auto">
      <TopSection />
      <HeroSection />
      <MidSection />
      <BottomSection />
    </div>
  )
}

export default Home
