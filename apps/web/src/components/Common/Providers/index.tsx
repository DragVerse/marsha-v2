import authLink from "@/lib/authLink";
import { getLivepeerClient, videoPlayerTheme } from "@dragverse/browser";
import {
  PRIVY_APP_ID,
  TAPE_APP_NAME,
  WC_PROJECT_ID
} from "@dragverse/constants";
import { ApolloProvider, apolloClient } from "@dragverse/lens/apollo";
import { LivepeerConfig } from "@livepeer/react";
import { type PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import {
  mainnet,
  polygon,
  polygonAmoy,
  polygonMumbai,
  sepolia
} from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import ErrorBoundary from "../ErrorBoundary";
import CuratedProfilesProvider from "./CuratedProfilesProvider";
import ServiceWorkerProvider from "./ServiceWorkerProvider";

const SubscriptionProvider = dynamic(() => import("./SubscriptionProvider"));
const TogglesProvider = dynamic(() => import("./TogglesProvider"));
const Layout = dynamic(() => import("../Layout"));

const NO_TOP_NAV_PATHS = ["/login"];
const NO_PADDING_PATHS = [
  "/u/[[...handle]]",
  "/profile/[id]",
  "/login",
  "/bytes",
  "/bytes/[id]",
  "/404",
  "/500"
];

const apolloQueryClient = apolloClient(authLink);
const livepeerClient = getLivepeerClient();
const reactQueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

const connectors = [
  injected(),
  walletConnect({ projectId: WC_PROJECT_ID }),
  coinbaseWallet({ appName: TAPE_APP_NAME })
];

export const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet, sepolia, polygonMumbai, polygon, polygonAmoy],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http()
  }
});

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false
  },
  loginMethods: ["email", "wallet", "google", "farcaster", "tiktok", "sms"],
  appearance: {
    showWalletLoginFirst: true
  }
};

const Providers = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();

  return (
    <ErrorBoundary>
      <ServiceWorkerProvider>
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
                  <WagmiProvider config={wagmiConfig}>
                    <Layout
                      skipNav={NO_TOP_NAV_PATHS.includes(pathname)}
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
      </ServiceWorkerProvider>
    </ErrorBoundary>
  );
};

export default Providers;
