import Logo from '@components/Common/Logo'
import MetaTags from '@components/Common/MetaTags'
import { EVENTS, Tower } from '@dragverse/generic'
import { usePrivy } from '@privy-io/react-auth'
import Link from 'next/link'
import { useEffect } from 'react'

const Login = () => {
  const { login, authenticated, ready } = usePrivy()

  useEffect(() => {
    Tower.track(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.LOGIN })
  }, [])

  const handleLogin = async () => {
    if (!authenticated) {
      await login()
    }
    // After successful login, you can redirect or perform other actions
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
          {ready && (
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {authenticated ? 'Connected' : 'Login with Privy'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
