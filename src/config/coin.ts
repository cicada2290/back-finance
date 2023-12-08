const issuer = process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS

export interface Asset {
  currency: string
  issuer?: string
  icon?: string
}

export const xrp: Asset = {
  currency: 'XRP',
  issuer: '',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
}

export const vni: Asset = {
  currency: 'VNI',
  issuer: issuer,
  icon: '/vanilla_swap_logo.png',
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

export const dot: Asset = {
  currency: 'DOT',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
}

export const arb: Asset = {
  currency: 'ARB',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png',
}

export const sui: Asset = {
  currency: 'SUI',
  issuer: issuer,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png',
}

export const coins = [
  xrp,
  vni,
  btc,
  eth,
  bnb,
  sol,
  trx,
  ltc,
  uni,
  apt,
  dot,
  arb,
  sui,
]
