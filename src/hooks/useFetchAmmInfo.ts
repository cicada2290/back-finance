import type { Balance, IssuedCurrencyAmount } from 'xrpl'
import { networks } from '@/config/site'
import { ammInfoParams } from '@/config/pools'
import { requestAmmInfo } from '@/utils/xrpl'

export interface AmmInfo {
  account: string
  amount: Balance
  amount2: Balance
  asset_frozen?: boolean
  asset2_frozen?: boolean
  auction_slot?: {
    account: string
    auth_accounts: Array<{
      account: string
    }>
    discounted_fee: number
  }
  expiration: string
  price: IssuedCurrencyAmount
  time_interval: number
  lp_token: IssuedCurrencyAmount
  trading_fee: number
  vote_slots?: Array<{
    account: string
    trading_fee: number
    vote_weight: number
  }>
}

export function useFetchAmmInfo() {
  const fetch = async () => {
    const ammList: AmmInfo[] = []

    for (const ammInfoParam of ammInfoParams) {
      const ammInfoResult = await requestAmmInfo({
        network: networks.devAmm,
        request: ammInfoParam,
      })
      if (ammInfoResult !== null) {
        ammList.push(ammInfoResult.result.amm as AmmInfo)
      }
    }

    return ammList
  }

  return {
    fetch,
  }
}
