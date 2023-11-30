import type { TrustSet, IssuedCurrencyAmount } from 'xrpl'
import Crossmark from '@/utils/wallet/crossmark'

const useTrustSet = () => {
  const submit = async ({
    account,
    limitAmount,
  }: {
    account: string
    limitAmount: IssuedCurrencyAmount
  }) => {
    const request: TrustSet = {
      TransactionType: 'TrustSet',
      Account: account,
      LimitAmount: limitAmount,
    }

    const crossmark = new Crossmark(window.xrpl)
    const response = await crossmark.submitTrustSet(request)

    return response
  }

  return {
    submit,
  }
}

export default useTrustSet
