import { getLivepeerClient, videoPlayerTheme } from '@dragverse/browser'
import { PRIVY_APP_ID } from '@dragverse/constants'
import { apolloClient, ApolloProvider } from '@dragverse/lens/apollo'
import authLink from '@lib/authLink'
import { LivepeerConfig } from '@livepeer/react'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import { PrivyProvider } from '@privy-io/react-auth'
import { createConfig, WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { mainnet, polygon, polygonMumbai, sepolia } from 'viem/chains'
import { http } from 'wagmi'

import ErrorBoundary from '../ErrorBoundary'
import CuratedProfilesProvider from './CuratedProfilesProvider'
import ThemeProvider from './ThemeProvider'

const SubscriptionProvider = dynamic(() => import('./SubscriptionProvider'))
const TogglesProvider = dynamic(() => import('./TogglesProvider'))
const Web3Provider = dynamic(() => import('./Web3Provider'))
const Layout = dynamic(() => import('../Layout'))

const NO_TOP_NAV_PATHS = ['/login']
const NO_BOTTOM_NAV_PATHS = ['/bangers']
const NO_PADDING_PATHS = [
  '/u/[[...handle]]',
  '/bangers',
  '/profile/[id]',
  '/login',
  '/bytes',
  '/bytes/[id]',
  '/404',
  '/500'
]

const apolloQueryClient = apolloClient(authLink)
const livepeerClient = getLivepeerClient()
const reactQueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

export const config = createConfig({
  chains: [mainnet, sepolia, polygonMumbai, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
    [polygon.id]: http()
  }
})

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false
  },
  loginMethods: ['wallet', 'email', 'sms'],
  appearance: {
    showWalletLoginFirst: true
  }
}

const Providers = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter()

  return (
    <ErrorBoundary>
      <Web3Provider>
        <ApolloProvider client={apolloQueryClient}>
          <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
            <QueryClientProvider client={reactQueryClient}>
              <ThemeProvider>
                <CuratedProfilesProvider />
                <SubscriptionProvider />
                <TogglesProvider />
                <LivepeerConfig
                  client={livepeerClient}
                  theme={videoPlayerTheme}
                >
                  <WagmiProvider config={config}>
                    <Layout
                      skipNav={NO_TOP_NAV_PATHS.includes(pathname)}
                      skipBottomNav={NO_BOTTOM_NAV_PATHS.includes(pathname)}
                      skipPadding={NO_PADDING_PATHS.includes(pathname)}
                    >
                      {children}
                    </Layout>
                  </WagmiProvider>
                </LivepeerConfig>
              </ThemeProvider>
            </QueryClientProvider>
          </PrivyProvider>
        </ApolloProvider>
      </Web3Provider>
    </ErrorBoundary>
  )
}

export default Providers
