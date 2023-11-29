import Binance from 'binance-api-node'

const coins = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT']

export async function GET() {
  const client = Binance({
    apiKey: process.env.API_BINANCE_KEY,
    apiSecret: process.env.API_BINANCE_SECRET,
    getTime: new Date().getTime,
  })

  const prices = await client.prices()

  const res = Object.keys(prices)
    .filter((key) => coins.includes(key))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((obj: any, key: string) => {
      const newKey = key.replace('USDT', '')
      obj[newKey] = prices[key]
      return obj
    }, {})

  return Response.json(res)
}
