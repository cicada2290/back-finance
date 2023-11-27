import type { Amount, Balance, IssuedCurrencyAmount } from 'xrpl'
import { ammInfoParams } from '@/config/pools'
import { networks } from '@/config/site'
import {
  requestAmmInfo,
  submitAMMCreate,
  fetchColdWallet,
  fetchHotWallet,
} from '@/utils/xrpl'

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

const useAmm = () => {
  /**
   * Fetches AMM info from the XRPL
   * @returns {Promise<AmmInfo[]>}
   */
  const fetchAmmInfo = async (): Promise<AmmInfo[]> => {
    const pools: AmmInfo[] = []

    for (const ammInfoParam of ammInfoParams) {
      const ammInfoResult = await requestAmmInfo({
        network: networks.devAmm,
        params: ammInfoParam,
      })
      if (ammInfoResult !== null) {
        pools.push(ammInfoResult.result.amm as AmmInfo)
      }
    }

    return pools
  }

  const createAmm = async ({
    asset1,
    asset2,
  }: {
    asset1: {
      currency: string
      value: string
    }
    asset2: {
      currency: string
      value: string
    }
  }) => {
    const coldWallet = fetchColdWallet()
    const hotWallet = fetchHotWallet()

    const response = await submitAMMCreate({
      network: networks.devAmm,
      params: {
        TransactionType: 'AMMCreate',
        Account: hotWallet.address,
        Amount: {
          currency: asset1.currency,
          value: asset1.value,
          issuer: coldWallet.address,
        } as Amount,
        Amount2: {
          currency: asset2.currency,
          value: asset2.value,
          issuer: coldWallet.address,
        } as Amount,
        TradingFee: 500, // 0.5%
      },
      wallet: hotWallet,
    })

    return response
  }

  return {
    fetchAmmInfo,
    createAmm,
  }
}

export default useAmm
