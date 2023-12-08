import type { AMMCreate } from 'xrpl'
import { useState } from 'react'
import axios from 'axios'
import Xrpl from '@/libs/xrpl'
import { getAssetPrice } from '@/utils/asset'

const useCreatePool = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * fetchPrices
   */
  const fetchPrices = async () => {
    const { data: prices } = await axios.get('/api/cryptocurrency/prices')
    return prices
  }

  /**
   * submit
   */
  const submit = async ({
    asset1,
    asset2,
  }: {
    asset1: {
      currency: string
    }
    asset2: {
      currency: string
    }
  }) => {
    try {
      setIsLoading(true)

      const client = new Xrpl()
      const issuerWallet = client.getIssuerWallet()

      const prices = await fetchPrices()
      const baseValue = String(1000 * 1000000)
      const baseAssetPrice = await getAssetPrice(asset1.currency, prices)
      const quoteAssetPrice = await getAssetPrice(asset2.currency, prices)
      const rate = Number(baseAssetPrice) / Number(quoteAssetPrice) / 1000000
      const quoteAssetValue =
        Math.floor(Number(baseValue) * rate * 1000000) / 1000000

      const baseAsset = {
        currency: asset1.currency,
        issuer: issuerWallet.address,
        value: baseValue.toString(),
      }

      const quoteAsset = {
        currency: asset2.currency,
        issuer: issuerWallet.address,
        value: quoteAssetValue.toString(),
      }

      const request: AMMCreate = {
        TransactionType: 'AMMCreate',
        Account: issuerWallet.address,
        Amount: baseAsset.value,
        Amount2: quoteAsset,
        TradingFee: 500,
      }

      const response = await client.ammCreate(request)
      console.info('[AMMCreate] response: ', response)
    } catch (error: unknown) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // state
    isLoading,
    setIsLoading,
    // function
    submit,
  }
}

export default useCreatePool
