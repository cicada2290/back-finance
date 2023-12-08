export interface AccountData {
  isConnected: boolean
  isSignedIn: boolean
  walletName: string | null
  address: string | null
  balance: number
}
