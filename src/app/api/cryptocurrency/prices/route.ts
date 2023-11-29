import Binance from 'binance-api-node'
import { NextResponse } from 'next/server'

const coins = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT']

export async function GET() {
  const client = Binance({
    apiKey: 'O14lstrxmuX0Zhv7Zk4pArdIFtH3yK7UjTz4QuhNwfSEFdXWLm6JWo5Utnx3jRJg',
    apiSecret:
      '7aZaNViAoMgf39fovzyLRsIEJPufV1m4Sg6Ibjgw3BD6Id2MINpYTqlRQxS0F7VD',
    getTime: new Date().getTime,
  })

  const prices = await client.prices()

  const res: {
    [key: string]: string
  } = Object.keys(prices)
    .filter((key) => coins.includes(key))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((obj: any, key: string) => {
      const newKey = key.replace('USDT', '')
      obj[newKey] = prices[key]
      return obj
    }, {})

  return NextResponse.json(res)
}
