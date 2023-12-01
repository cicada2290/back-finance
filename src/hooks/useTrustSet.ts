import type { TrustSet, IssuedCurrencyAmount } from 'xrpl'
import crossmark from '@crossmarkio/sdk'

const useTrustSet = () => {
  const submit = async ({
    account,
    limitAmount,
  }: {
    account: string
    limitAmount: IssuedCurrencyAmount
  }) => {
    const response = await crossmark.signAndSubmit({
      TransactionType: 'TrustSet',
      Account: account,
      LimitAmount: limitAmount,
    } as TrustSet)

    return response
  }

  return {
    submit,
  }
}

export default useTrustSet
