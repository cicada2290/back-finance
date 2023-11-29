interface Asset {
  currency: string
  issuer?: string
  icon?: string
}

export const xrp: Asset = {
  currency: 'XRP',
  issuer: '',
  icon: '',
}

export const btc: Asset = {
  currency: 'BTC',
  issuer: 'rpjpQizArxwQcjhWmioaqjojqv634LJ4as',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
}

export const eth: Asset = {
  currency: 'ETH',
  issuer: 'rpjpQizArxwQcjhWmioaqjojqv634LJ4as',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
}

export const bnb: Asset = {
  currency: 'BNB',
  issuer: 'rpjpQizArxwQcjhWmioaqjojqv634LJ4as',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
}

export const coins = [xrp, btc, eth, bnb]
