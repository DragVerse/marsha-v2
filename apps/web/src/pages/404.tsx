import Logo from '@components/Common/Logo'
import MetaTags from '@components/Common/MetaTags'
import { Button } from '@dragverse/ui'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <>
      <MetaTags title="Not found" />
      <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-4 text-center">
        <Logo />
        <h1 className="font-syne text-brand-500 text-4xl font-bold">
          404 👀 FASHION EMERGENCY
        </h1>
        <div className="text-text mb-6">
          This page you are looking for could not be found. Maybe Drag Delusion?
          💅
        </div>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </>
  )
}

export default Custom404
