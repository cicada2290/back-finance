import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      currency: 'XRP',
      price: '0.6679',
    },
    {
      currency: 'VNI',
      price: '1.00',
    },
    {
      currency: 'BTC',
      price: '43714.12',
    },
    {
      currency: 'ETH',
      price: '2348.97',
    },
    {
      currency: 'BNB',
      price: '235.22',
    },
    {
      currency: 'SOL',
      price: '73.31',
    },
    {
      currency: 'TRX',
      price: '0.106',
    },
    {
      currency: 'LTC',
      price: '77.21',
    },
    {
      currency: 'UNI',
      price: '6.42',
    },
    {
      currency: 'APT',
      price: '8.42',
    },
    {
      currency: 'DOT',
      price: '6.67',
    },
    {
      currency: 'ARB',
      price: '1.16',
    },
    {
      currency: 'SUI',
      price: '0.7045',
    },
  ])
}
