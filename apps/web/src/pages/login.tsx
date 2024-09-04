import Logo from '@components/Common/Logo'
import MetaTags from '@components/Common/MetaTags'
import Authenticate from '@components/Login/Authenticate'
import Connectors from '@components/Login/Connectors'
import { EVENTS, Tower } from '@dragverse/generic'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    Tower.track(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.LOGIN })
    setIsAuthenticated(false)
  }, [])

  const handleAuthentication = (status: boolean) => {
    setIsAuthenticated(status)
  }

  return (
    <div className="dark:bg-brand-850 relative flex h-screen w-screen overflow-hidden bg-[#FAFAFA]">
      <MetaTags title="🗝 Login to Dragverse" />
      <div className="grid h-full w-full place-items-center">
        <div className="ultrawide:p-8 laptop:p-6 fixed top-0 z-10 flex h-16 w-full items-center justify-between p-4">
          <Link href="/" passHref>
            <Logo />
          </Link>
        </div>
        <div className="tape-border container relative z-10 mx-auto max-w-md bg-white bg-opacity-50 p-10 backdrop-blur-sm dark:bg-inherit">
          <div className="mb-6">
            <h2 className="text-brand-200 text-center text-2xl font-bold">
              Welcome to Dragverse
            </h2>
            <p className="text-center">
              The most ✨ iconic ✨ version of yourself online
            </p>
          </div>
          {!isAuthenticated ? (
            <Connectors onAuthenticated={handleAuthentication} />
          ) : (
            <Authenticate />
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
