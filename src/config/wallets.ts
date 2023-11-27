export const issuerAddress = process.env
  .NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

export enum Wallets {
  Crossmark = 'Crossmark',
  Xumm = 'Xumm',
  GemWallet = 'Gem wallet',
}

export const XUMM = {
  API_KEY: process.env.NEXT_PUBLIC_XUMM_API_KEY as string,
  API_SECRET: process.env.NEXT_PUBLIC_XUMM_API_SECRET as string,
}
