import type { AMMInfoRequest } from 'xrpl'
import { btc, eth, bnb } from '@/config/coin'

const issuer = process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

export const pools = [
  {
    asset: btc.currency,
    asset2: eth.currency,
  },
  {
    asset: btc.currency,
    asset2: bnb.currency,
  },
]

export const ammInfoParams = pools.map((pool) => {
  return {
    command: 'amm_info',
    asset: {
      currency: pool.asset,
      issuer: issuer,
    },
    asset2: {
      currency: pool.asset2,
      issuer: issuer,
    },
    ledger_index: 'validated',
  } as AMMInfoRequest
})
