const issuer = process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

const btc = 'BTC'
const eth = 'ETH'
const bnb = 'BNB'

export const pools = [
  {
    asset: btc,
    asset2: eth,
  },
  {
    asset: btc,
    asset2: bnb,
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
  }
})
