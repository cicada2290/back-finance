import { useState } from 'react'
import { Wallets } from '@/config/wallets'
import { useAccountContext } from '@/context/accountContext'
import Crossmark from '@/utils/wallet/crossmark'
import useAuth from './useAuth'

const useConnectWallet = () => {
  const [account, setAccount] = useState<string>('')
  const [error, setError] = useState<Error>()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setAccountData } = useAccountContext()
  const { signin } = useAuth()

  const initState = () => {
    setAccount('')
    setError(undefined)
    setIsError(false)
    setIsLoading(true)
  }

  const connectCrossmark = async () => {
    try {
      initState()

      // check if crossmark is installed
      if (!window.xrpl) throw new Error('Crossmark not installed')
      if (!window.xrpl.crossmark) throw new Error('Crossmark not installed')

      // sign in
      const client = new Crossmark(window.xrpl.crossmark)
      const response = await client.login()

      if (response.meta.isRejected) return

      // set account
      setAccountData({
        isConnected: true,
        isSignedIn: true,
        walletName: Wallets.Crossmark,
        address: response.address,
        balance: 0,
      })

      setAccount(response.address)
      setIsLoading(false)

      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error)
        setIsError(true)
      } else {
        setError(new Error('Unknown error'))
        setIsError(true)
      }
      setIsLoading(false)
    }
    console.info('connectCrossmark')
  }

  const connectXumm = () => {}

  const disconnect = () => {
    setAccountData({
      isConnected: false,
      isSignedIn: false,
      walletName: '',
      address: '',
      balance: 0,
    })
  }

  return {
    // state
    account,
    error,
    isError,
    isLoading,
    // function
    connectCrossmark,
    connectXumm,
    disconnect,
  }
}

export default useConnectWallet
