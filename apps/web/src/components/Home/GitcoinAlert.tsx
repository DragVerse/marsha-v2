import { GITCOIN_LIVE_ROUND, SHOW_GITCOIN_BANNER } from '@dragverse/constants'
import { Button } from '@dragverse/ui'
import Link from 'next/link'

const GitcoinAlert = () => {
  if (!SHOW_GITCOIN_BANNER) {
    return null
  }

  return (
    <div className="tape-border rounded-large ultrawide:h-[400px] relative flex h-[350px] w-full flex-none overflow-hidden sm:w-[300px] lg:w-[500px]">
      <div className="bg-brand-150 absolute inset-0 h-full w-full" />
      <div className="from-brand-250 absolute inset-0 h-full w-full bg-gradient-to-b to-transparent" />

      <div className="ultrawide:p-8 relative flex h-full flex-col justify-end space-y-4 p-4 text-left md:p-6">
        <div className="text-3xl">
          {' '}
          Thank you for your support during GG{GITCOIN_LIVE_ROUND} Round ⚡
        </div>
        <p className="md:text-md max-w-2xl text-sm lg:text-lg">
          Thank you to all the donors and the 800+ growers who enjoyed Drag
          performances during the Let’s GROW DAO Livestream!
        </p>
        <div className="flex">
          <Link
            href="https://www.dragverse.io/post/explore-dragverse-with-privy-a-new-era-of-access"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>More Updates</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GitcoinAlert
