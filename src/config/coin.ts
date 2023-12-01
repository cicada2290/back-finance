const issuer = process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS

interface Asset {
  currency: string
  issuer?: string
  icon?: string
}

export const xrp: Asset = {
  currency: 'XRP',
  issuer: '',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
}

export const btc: Asset = {
  currency: 'BTC',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
}

export const eth: Asset = {
  currency: 'ETH',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
}

export const bnb: Asset = {
  currency: 'BNB',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
}

export const sol: Asset = {
  currency: 'SOL',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
}

export const trx: Asset = {
  currency: 'TRX',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
}

export const ltc: Asset = {
  currency: 'LTC',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
}

export const uni: Asset = {
  currency: 'UNI',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
}

export const apt: Asset = {
  currency: 'APT',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png',
}

export const coins = [xrp, btc, eth, bnb, sol, trx, ltc, uni, apt]
