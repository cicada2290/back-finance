import type { Payment } from 'xrpl'
import { useState } from 'react'
import Xrpl from '@/libs/xrpl'

const useMintToken = () => {
  const [error, setError] = useState<Error>()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const initState = () => {
    setError(undefined)
    setIsError(false)
    setIsLoading(true)
  }

  const mint = async ({
    currency,
    issuer,
    account,
    value,
  }: {
    currency: string
    issuer: string
    account: string
    value: string
  }) => {
    try {
      initState()

      const client = new Xrpl()

      const response = await client.mintToken({
        TransactionType: 'Payment',
        Account: issuer,
        Destination: account,
        Amount: {
          currency,
          issuer,
          value,
        },
      } as Payment)

      console.log('[MintToken]', response)

      setIsLoading(false)

      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error)
        setIsError(true)
      } else {
        setError(new Error('Unknown error'))
        setIsError(true)
      }
      setIsLoading(false)
    }
  }

  return {
    // state
    error,
    isError,
    isLoading,
    // functions
    mint,
  }
}

export default useMintToken
