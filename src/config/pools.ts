import type { AMMInfoRequest } from 'xrpl'
import { btc, eth, bnb } from '@/config/coin'
import { issuerAddress } from '@/config/wallets'

export const pools = [
  {
    asset: btc.currency,
    asset2: eth.currency,
  },
  {
    asset: btc.currency,
    asset2: bnb.currency,
  },
  {
    asset: eth.currency,
    asset2: bnb.currency,
  },
]

export const ammInfoParams = pools.map((pool) => {
  return {
    command: 'amm_info',
    asset: {
      currency: pool.asset,
      issuer: issuerAddress,
    },
    asset2: {
      currency: pool.asset2,
      issuer: issuerAddress,
    },
    ledger_index: 'validated',
  } as AMMInfoRequest
})
