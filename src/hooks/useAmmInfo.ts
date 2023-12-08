import type { Amount } from 'xrpl'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Commands } from '@/config/xrpl/commands'
import { getAssetIcon, getAssetPrice } from '@/utils/asset'
import { requests as ammInfoRequests } from '@/config/xrpl/request/ammInfo'
import { useAccountContext } from '@/context/accountContext'
import Xrpl from '@/libs/xrpl'

export interface Data {
  id: number
  name: string
  isCreated: boolean
  asset1: {
    currency: string
    issuer?: string
    value: number
    icon: string
  }
  asset2: {
    currency: string
    issuer?: string
    value: number
    icon: string
  }
  lp: {
    account: string
    volumeUsd: number
  }
  my: {
    amount1: number
    amount2: number
    volumeUsd: number
  }
}

export type LoadingState =
  | 'loading'
  | 'sorting'
  | 'loadingMore'
  | 'error'
  | 'idle'
  | 'filtering'

const useAmmInfo = () => {
  const [data, setData] = useState<Data[]>([])
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingState, setLoadingState] = useState<LoadingState>('loading')

  const { accountData } = useAccountContext()

  /**
   * fetchPrices
   */
  const fetchPrices = async () => {
    const { data: prices } = await axios.get('/api/cryptocurrency/prices')
    return prices
  }

  /**
   * fetchAccountLines
   */
  const fetchAccountLines = async (client: Xrpl) => {
    let lines: {
      account: string
      balance: string
      currency: string
    }[] = []
    if (accountData.address) {
      const accountLines = await client.accountLines({
        command: Commands.accountLines,
        account: accountData.address,
      })
      lines = accountLines.result.lines.map((line) => ({
        account: line.account,
        balance: line.balance,
        currency: line.currency,
      }))
      console.info('[AccountLine] ', lines)
    }
    return lines
  }

  /**
   * getAssetValue
   */
  const getAssetValue = (asset: Amount | string | undefined): number => {
    if (!asset) {
      return Number(0)
    } else if (typeof asset === 'string') {
      return Number(asset) / Number(1000000)
    } else {
      return Number(asset.value)
    }
  }

  const getMyLpBalance = (
    lpAccount: string,
    line: { account: string; balance: string; currency: string }[]
  ): number => {
    const balance = line.find((line) => line.account === lpAccount)?.balance
    return balance ? Number(balance) : 0
  }

  const fetchData = async () => {
    if (!accountData.address) return
    const result: Data[] = []
    try {
      setIsLoading(true)
      setLoadingState('loading')

      const client = new Xrpl()
      const prices = await fetchPrices()
      const lines = await fetchAccountLines(client)

      let counter = 1
      for (const request of ammInfoRequests) {
        // Name
        const baseAssetName = request.asset?.currency as string
        const quoteAssetName = request.asset2?.currency as string

        // Fetch AMMInfo
        const response = await client
          .ammInfo(request)
          .then((res) => {
            return res.result.amm
          })
          .catch(() => undefined)

        console.info(
          '[AMMInfo]: ',
          request.asset?.currency,
          request.asset2?.currency,
          response
        )

        // Value
        const baseAssetValue = getAssetValue(response?.amount)
        const quoteAssetValue = getAssetValue(response?.amount2)

        // Price
        const baseAsestPrice = getAssetPrice(baseAssetName, prices)
        const quoteAssetPrice = getAssetPrice(quoteAssetName, prices)

        // LP volume
        const lpVolume =
          Number(baseAssetValue) * Number(baseAsestPrice) +
          Number(quoteAssetValue) * Number(quoteAssetPrice)

        // My LP
        let myLpBalance = 0
        if (response) {
          myLpBalance = getMyLpBalance(response.account, lines)
        }

        // LP rate
        let lpRate = 0
        if (response) {
          lpRate = Number(myLpBalance) / Number(response.lp_token.value)
        }

        // LP amount
        const myLpBaseAmount =
          Math.round(baseAssetValue * lpRate * 10000) / 10000
        const myLpQuoteAmount =
          Math.round(quoteAssetValue * lpRate * 10000) / 10000
        const myVolumeUsd =
          Math.round(
            (myLpBaseAmount * Number(baseAsestPrice) +
              myLpQuoteAmount * Number(quoteAssetPrice)) *
              10000
          ) / 10000

        // Set AMMInfoData
        const ammInfoData: Data = {
          id: counter++,
          name: `${baseAssetName}-${quoteAssetName}`,
          isCreated: response !== undefined ? true : false,
          asset1: {
            currency: baseAssetName,
            issuer: request.asset?.issuer as string,
            value: baseAssetValue,
            icon: getAssetIcon(baseAssetName),
          },
          asset2: {
            currency: quoteAssetName,
            issuer: request.asset2?.issuer as string,
            value: quoteAssetValue,
            icon: getAssetIcon(quoteAssetName),
          },
          lp: {
            account: response?.account as string,
            volumeUsd: lpVolume,
          },
          my: {
            amount1: myLpBaseAmount,
            amount2: myLpQuoteAmount,
            volumeUsd: myLpBalance !== 0 ? myVolumeUsd : 0,
          },
        }

        console.log('[AmmInfo]: ', ammInfoData)
        result.push(ammInfoData)
      }

      console.info('[AMMInfo]: result: ', result)

      setData(result)
    } catch (error: unknown) {
      console.error('Error fetching data:', error)
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('An unknown error occurred'))
      }
    } finally {
      setIsLoading(false)
      setLoadingState('idle')
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData.address])

  return {
    // state
    data,
    error,
    isLoading,
    loadingState,
    // function
    fetchData,
  }
}

export default useAmmInfo
