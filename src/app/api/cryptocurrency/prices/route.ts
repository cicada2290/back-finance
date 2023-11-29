import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    data: [
      {
        currency: 'BTC',
        price: '38311.64',
      },
      {
        currency: 'ETH',
        price: '2069.65',
      },
      {
        currency: 'BNB',
        price: '231.11',
      },
      {
        currency: 'XRP',
        price: '0.61',
      },
    ],
  })
}
