import type { AMMWithdraw } from 'xrpl'
import { useState } from 'react'
import crossmark from '@crossmarkio/sdk'

const issuerAddress = process.env
  .NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

interface Amount {
  currency: string
  issuer: string
  value: string
}

const useAmmWithdraw = () => {
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * submit
   */
  const submit = async ({
    account,
    asset1,
    asset2,
  }: {
    account: string
    asset1: Amount
    asset2: Amount
  }) => {
    asset1.value = '10000000'
    setIsLoading(true)
    try {
      const isXRP = asset1.currency === 'XRP'

      const baseAsset1 = isXRP
        ? {
            currency: asset1.currency,
          }
        : {
            currency: asset1.currency,
            issuer: issuerAddress,
          }
      const baseAsset2 = !isXRP
        ? {
            currency: asset2.currency,
          }
        : {
            currency: asset2.currency,
            issuer: issuerAddress,
          }

      const request: AMMWithdraw = {
        TransactionType: 'AMMWithdraw',
        Account: account,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Asset: baseAsset1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Asset2: baseAsset2,
        Flags: 131072,
      }

      const response = await crossmark.signAndSubmit(request)
      console.info('[AMMWithdraw]: ', response)

      return response
    } catch (error: unknown) {
      console.error('Error fetching data:', error)
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('An unknown error occurred'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // state
    error,
    isLoading,
    // function
    submit,
  }
}

export default useAmmWithdraw
