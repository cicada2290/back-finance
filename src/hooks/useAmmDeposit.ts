import type { AMMDeposit } from 'xrpl'
import { useState } from 'react'
import axios from 'axios'
import crossmark from '@crossmarkio/sdk'
import { getAssetPrice } from '@/utils/asset'

const issuerAddress = process.env
  .NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

interface Amount {
  currency: string
  issuer: string
  value: string
}

const useAmmDeposit = () => {
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
    try {
      asset1.value = '50000000'
      setIsLoading(true)

      const isXRP = asset1.currency === 'XRP'
      const { data: prices } = await axios.get('/api/cryptocurrency/prices')

      const baseAsest1Price = getAssetPrice(asset1.currency, prices)
      const baseAsest2Price = getAssetPrice(asset2.currency, prices)

      const rate = Number(baseAsest1Price) / Number(baseAsest2Price) / 1000000

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

      const baseAmount1 = isXRP
        ? asset1.value
        : {
            currency: asset1.currency,
            issuer: issuerAddress,
            value: asset1.value,
          }
      const baseAmount2 = !isXRP
        ? asset2.value
        : {
            currency: asset2.currency,
            issuer: issuerAddress,
            value: String((Number(asset1.value) * rate).toFixed(8)),
          }

      const request: AMMDeposit = {
        TransactionType: 'AMMDeposit',
        Account: account,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Asset: baseAsset1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Asset2: baseAsset2,
        Amount: baseAmount1,
        Amount2: baseAmount2,
        Flags: 1048576,
      }

      const response = await crossmark.signAndSubmit(request)
      console.info('[AMMDeposit]: ', response)
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

export default useAmmDeposit
