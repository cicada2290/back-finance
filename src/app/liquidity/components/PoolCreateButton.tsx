import type { AMMCreate } from 'xrpl'
import { Button } from '@nextui-org/react'
import { getAssetPrice } from '@/utils/asset'
import Xrpl from '@/libs/xrpl'

const PoolCreateButton = () => {
  const fetchPrices = async () => {
    const response = await fetch('/api/cryptocurrency/prices')
    const json = await response.json()

    return json
  }

  const handleCreatePool = async () => {
    const pricelist = await fetchPrices()

    const client = new Xrpl()
    const issuerWallet = client.getIssuerWallet()

    const baseAsset = {
      currency: 'XRP',
      issuer: issuerWallet.address,
      value: String(1000 * 1000000),
    }

    const quoteAsset = {
      currency: 'BTC',
      issuer: issuerWallet.address,
      value: '',
    }

    const baseAssetPrice = await getAssetPrice(baseAsset.currency, pricelist)
    const quoteAssetPrice = await getAssetPrice(quoteAsset.currency, pricelist)
    const rate = Number(baseAssetPrice) / Number(quoteAssetPrice) / 1000000

    quoteAsset.value = String((Number(baseAsset.value) * rate).toFixed(6))

    console.info('[baseAsset]', baseAsset)
    console.info('[quoteAsset]', quoteAsset)

    try {
      const request: AMMCreate = {
        TransactionType: 'AMMCreate',
        Account: issuerWallet.address,
        Amount: baseAsset.value,
        Amount2: quoteAsset,
        TradingFee: 500,
      }
      console.info('[AMMCreate] request: ', request)

      const response = await client.ammCreate(request)

      console.info('[AMMCreate] response: ', response)

      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <>
      <Button isDisabled={false} onPress={handleCreatePool}>
        CREATE POOL
      </Button>
    </>
  )
}

export default PoolCreateButton
