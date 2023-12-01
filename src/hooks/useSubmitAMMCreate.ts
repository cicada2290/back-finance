import type { AMMCreate, Amount } from 'xrpl'
import Xrpl from '@/libs/xrpl'

interface AMMCreateRequest {
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
  const submit = async ({ asset1, asset2, tradingFee }: AMMCreateRequest) => {
    const client = new Xrpl()

    const issuerWallet = client.getIssuerWallet()
    const operatorWallet = client.getOperatorWallet()

    const response = await client.ammCreate({
      TransactionType: 'AMMCreate',
      Account: operatorWallet.address,
      Amount: {
        currency: asset1.currency,
        value: asset1.value,
        issuer: issuerWallet.address,
      } as Amount,
      Amount2: {
        currency: asset2.currency,
        value: asset2.value,
        issuer: issuerWallet.address,
      } as Amount,
      TradingFee: tradingFee,
    } as AMMCreate)

    return response
  }

  return {
    submit,
  }
}
