import type { AMMCreate, Amount, Wallet } from 'xrpl'
import { networks } from '@/config/site'
import { issuerAddress } from '@/config/wallets'
import { submitAMMCreate } from '@/utils/xrpl'

interface AMMCreateRequest {
  wallet: Wallet
  asset1: {
    currency: string
    value: string
  }
  asset2: {
    currency: string
    value: string
  }
  tradingFee: number
}

export function useSubmitAMMCreate() {
  const submit = async ({
    wallet,
    asset1,
    asset2,
    tradingFee,
  }: AMMCreateRequest) => {
    const ammCreateRequest: AMMCreate = {
      TransactionType: 'AMMCreate',
      Account: wallet.address,
      Amount: {
        currency: asset1.currency,
        value: asset1.value,
        issuer: issuerAddress,
      } as Amount,
      Amount2: {
        currency: asset2.currency,
        value: asset2.value,
        issuer: issuerAddress,
      } as Amount,
      TradingFee: tradingFee,
    }

    const response = await submitAMMCreate({
      network: networks.devAmm,
      request: ammCreateRequest,
      wallet: wallet,
    })

    return response
  }

  return {
    submit,
  }
}
