import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
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
    {
      currency: 'SOL',
      price: '59.62',
    },
    {
      currency: 'TRX',
      price: '0.103',
    },
    {
      currency: 'LTC',
      price: '69.38',
    },
    {
      currency: 'UNI',
      price: '5.88',
    },
    {
      currency: 'APT',
      price: '6.96',
    },
  ])
}
