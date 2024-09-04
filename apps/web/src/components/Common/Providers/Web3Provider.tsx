import { PRIVY_APP_ID, WC_PROJECT_ID } from '@dragverse/constants'
import { PrivyProvider } from '@privy-io/react-auth'
import { type FC, type ReactNode } from 'react'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const connectors = [
  injected(),
  // TODO: showQrModal: false is a temporary fix for the issue with WalletConnect
  walletConnect({ projectId: WC_PROJECT_ID, showQrModal: false })
  // TODO: commented until this error is fixed: ReferenceError: localStorage is not defined
  // coinbaseWallet({ appName: TAPE_APP_NAME })
]

const wagmiConfig = createConfig({
  connectors,
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http()
  }
})

type Props = {
  children: ReactNode
}

const Web3Provider: FC<Props> = ({ children }) => {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url.com'
        },
        supportedChains: [polygon, polygonAmoy]
      }}
    >
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </PrivyProvider>
  )
}

export default Web3Provider
