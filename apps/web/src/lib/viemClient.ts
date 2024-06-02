import { IS_MAINNET, POLYGON_RPC_URL } from '@dragverse/constants'
import { createPublicClient, http } from 'viem'
import { polygon, polygonAmoy } from 'viem/chains'

export const viemPublicClient = createPublicClient({
  chain: IS_MAINNET ? polygon : polygonAmoy,
  transport: http(POLYGON_RPC_URL)
})
