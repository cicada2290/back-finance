import type { AMMCreate } from 'xrpl'
import { Button } from '@nextui-org/react'
import { getAssetPrice } from '@/utils/asset'
import { networks } from '@/config/site'
import { fetchColdWallet, newClient } from '@/utils/xrpl'

const PoolCreateButton = () => {
  const fetchPrices = async () => {
    const response = await fetch('/api/cryptocurrency/prices')
    const json = await response.json()

    return json
  }

  const handleCreatePool = async () => {
    const pricelist = await fetchPrices()

    const baseAsset = {
      currency: 'XRP',
      issuer: process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string,
      value: '10000000',
    }

    const quoteAsset = {
      currency: 'SOL',
      issuer: process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string,
      value: '',
    }

    const baseAssetPrice = await getAssetPrice(baseAsset.currency, pricelist)
    const quoteAssetPrice = await getAssetPrice(quoteAsset.currency, pricelist)
    const rate = Number(baseAssetPrice) / Number(quoteAssetPrice)

    quoteAsset.value = String((Number(baseAsset.value) * rate).toFixed(6))

    console.log('[quoteAsset]', quoteAsset)

    try {
      const issuerWallet = await fetchColdWallet()

      const request: AMMCreate = {
        TransactionType: 'AMMCreate',
        Account: issuerWallet.address,
        Amount: '100000',
        Amount2: quoteAsset,
        TradingFee: 500,
      }

      const client = newClient(networks.default)
      await client.connect()

      const response = await client.submitAndWait(request, {
        wallet: issuerWallet,
      })
      console.log('[AMMCreate]', response)

      await client.disconnect()

      // const id = await crossmark.signAndSubmitAndWait(request)

      // console.info("[Create pool]", id)
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
