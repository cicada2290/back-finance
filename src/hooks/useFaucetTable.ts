import { useEffect, useState } from 'react'
import { coins } from '@/config/coin'
import { useAccountContext } from '@/context/accountContext'
import Xrpl from '@/libs/xrpl'
import { Commands } from '@/config/xrpl/commands'

export interface FaucetTableData {
  currency: string
  issuer: string
  icon: string
  isTrusted: boolean
  isMinted: boolean
  balance: string
}

export type LoadingState =
  | 'loading'
  | 'sorting'
  | 'loadingMore'
  | 'error'
  | 'idle'
  | 'filtering'

const useFaucetTable = () => {
  const [data, setData] = useState<FaucetTableData[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>('loading')
  const { accountData } = useAccountContext()

  const fetchData = async () => {
    try {
      setLoadingState('loading')

      const client = new Xrpl()

      const issuerWallet = client.getIssuerWallet()
      console.log('[issuerWallet]', issuerWallet)

      // Fetch account currencies
      const accountCurrencies = await client.accountCurrencies({
        command: Commands.accountCurrencies,
        account: issuerWallet.address,
      })
      const mintedCurrencies = accountCurrencies.result.receive_currencies
      console.log('[accountCurrencies]', mintedCurrencies)

      // Fetch account lines
      let accountLines = null
      if (accountData.address) {
        const response = await await client.accountLines({
          command: Commands.accountLines,
          account: accountData.address,
        })

        accountLines = response.result.lines
      }
      console.log('[accountLines]', accountLines)

      const coinlist = []
      for (const coin of coins) {
        if (coin.currency === 'XRP') continue

        let isTrusted = false
        let balane = '0'
        if (accountLines) {
          isTrusted = accountLines.some(
            (trust) =>
              trust.currency === coin.currency && trust.account === coin.issuer
          )
          balane =
            accountLines.find(
              (trust) =>
                trust.currency === coin.currency &&
                trust.account === coin.issuer
            )?.balance || '0'
        }

        coinlist.push({
          currency: coin.currency,
          issuer: coin.issuer || '',
          icon: coin.icon || '',
          isTrusted: isTrusted,
          balance: balane,
          isMinted: mintedCurrencies.includes(coin.currency),
        })
      }

      setData(coinlist)
      setLoadingState('idle')
    } catch (error) {
      console.error(error)
      setLoadingState('error')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData])

  return {
    // state
    data,
    loadingState,
    setLoadingState,
    // actions
    fetchData,
  }
}

export default useFaucetTable
