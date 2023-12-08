import type { AMMInfoRequest } from 'xrpl'

const command = 'amm_info'
const issuer = process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

export const requests: AMMInfoRequest[] = [
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'VNI',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'BTC',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'ETH',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'BNB',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'SOL',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'TRX',
      issuer,
    },
  },
  /*
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'LTC',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'UNI',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'APT',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'DOT',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'ARB',
      issuer,
    },
  },
  {
    command,
    asset: {
      currency: 'XRP',
    },
    asset2: {
      currency: 'SUI',
      issuer,
    },
  },
  */
]
