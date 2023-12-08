import type { TrustSet, IssuedCurrencyAmount } from 'xrpl'
import { useState } from 'react'
import crossmark from '@crossmarkio/sdk'

const useTrustSet = () => {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async ({
    account,
    limitAmount,
  }: {
    account: string
    limitAmount: IssuedCurrencyAmount
  }) => {
    setIsLoading(true)

    const response = await crossmark.signAndSubmit({
      TransactionType: 'TrustSet',
      Account: account,
      LimitAmount: limitAmount,
    } as TrustSet)
    console.info('[TrustSet]', response)

    setIsLoading(false)
  }

  return {
    isLoading,
    submit,
  }
}

export default useTrustSet
