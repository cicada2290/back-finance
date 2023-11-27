import { ammInfoParams } from '@/config/pools'
import { newClient } from '@/utils/xrpl'
import { networks } from '@/config/site'

export interface AmmInfo {
  account: string
  amount: {
    currency: string
    issuer: string
    value: string
  }
  amount2: {
    currency: string
    issuer: string
    value: string
  }
  asset_frozen: boolean
  asset2_frozen: boolean
  auction_slot: {
    account: string
    discounted_fee: number
    expiration: string
    price: {
      currency: string
      issuer: string
      value: string
    }
    time_interval: number
  }
  lp_token: {
    currency: string
    issuer: string
    value: string
  }
  trading_fee: number
  vote_slots: {
    account: string
    trading_fee: number
    vote_weight: number
  }[]
}

const useAmm = () => {
  /**
   * Fetches AMM info from the XRPL
   * @returns {Promise<AmmInfo[]>}
   */
  const fetchAmmInfo = async (): Promise<AmmInfo[]> => {
    const client = newClient(networks.devAmm)
    await client.connect()

    const pools = []
    for (const ammInfoParam of ammInfoParams) {
      const ammInfoResult = await client.request(ammInfoParam).catch(() => null)
      if (ammInfoResult !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = ammInfoResult.result as any
        pools.push(result.amm)
      }
    }

    await client.disconnect()

    return pools
  }

  return {
    fetchAmmInfo,
  }
}

export default useAmm
