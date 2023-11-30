import type { Amount } from 'xrpl'
import { coins } from '@/config/coin'

export const getAssetName = (asset: Amount | string): string => {
  return typeof asset === 'string' ? 'XRP' : asset.currency
}

export const getAssetIcon = (currency: string): string => {
  const coin = coins.find((coin) => coin.currency === currency)
  return coin?.icon ?? ''
}

export const getAssetPrice = (
  currency: string,
  pricelist: { currency: string; price: string }[]
) => {
  const price = pricelist.find((price) => price.currency === currency)?.price
  return price
}
