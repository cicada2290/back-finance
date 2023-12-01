import { useEffect, useState } from 'react'
import axios from 'axios'
import { Commands } from '@/config/xrpl/commands'
import { getAssetName, getAssetIcon, getAssetPrice } from '@/utils/asset'
import { requests } from '@/config/xrpl/request/ammInfo'
import { useAccountContext } from '@/context/accountContext'
import Xrpl from '@/libs/xrpl'

const issuerAddress = process.env
  .NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string

export interface Data {
  id: number
  name: string
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
    price: number
  }
  my: {
    amount1: string
    amount2: string
    price: string
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
    }[] = []
    if (accountData.address) {
      const accountLines = await client.accountLines({
        command: Commands.accountLines,
        account: accountData.address,
      })
      lines = accountLines.result.lines.map((line) => ({
        account: line.account,
        balance: line.balance,
      }))
      console.info('[AccountLine] ', lines)
    }
    return lines
  }

  const fetchData = async () => {
    const result: Data[] = []
    try {
      setIsLoading(true)
      setLoadingState('loading')
      const client = new Xrpl()
      const prices = await fetchPrices()
      const lines = await fetchAccountLines(client)

      let counter = 1
      for (const request of requests) {
        // Fetch AMMInfo
        const response = await client.ammInfo(request).catch(() => undefined)
        if (!response) {
          continue
        }

        console.info(
          '[AMMInfo]: ',
          request.asset?.currency,
          request.asset2?.currency,
          response.result.amm
        )

        // My data
        const myLp: { account: string; balance: string } | undefined =
          lines.find((line) => line.account === response.result.amm.account)

        let lpRate = 0
        if (myLp) {
          lpRate =
            Number(myLp.balance) / Number(response.result.amm.lp_token.value)
        }

        // AMMInfo
        const ammInfo = response.result.amm

        // Mapping
        const baseAssetName = getAssetName(ammInfo.amount)
        const baseAssetValue =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          baseAssetName === 'XRP'
            ? Number(ammInfo.amount) / Number(1000000)
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ammInfo.amount.value
        const baseAsestPrice = getAssetPrice(baseAssetName, prices)
        const quoteAssetName = getAssetName(ammInfo.amount2)
        const quoteAssetValue =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          quoteAssetName === 'XRP' ? ammInfo.amount2 : ammInfo.amount2.value
        const quoteAssetPrice = getAssetPrice(quoteAssetName, prices)
        const lpPrice =
          Number(baseAssetValue) * Number(baseAsestPrice) +
          Number(quoteAssetValue) * Number(quoteAssetPrice)

        const mappingData: Data = {
          id: counter++,
          name: `${baseAssetName}-${quoteAssetName}`,
          asset1: {
            currency: baseAssetName,
            issuer: baseAssetName === 'XRP' ? undefined : issuerAddress,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value: Number(baseAssetValue).toFixed(6),
            icon: getAssetIcon(baseAssetName),
          },
          asset2: {
            currency: quoteAssetName,
            issuer: quoteAssetName === 'XRP' ? undefined : issuerAddress,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value: Number(quoteAssetValue).toFixed(6),
            icon: getAssetIcon(quoteAssetName),
          },
          lp: {
            account: ammInfo.account,
            price: lpPrice,
          },
          my: {
            amount1: (baseAssetValue * lpRate).toFixed(6),
            amount2: (quoteAssetValue * lpRate).toFixed(6),
            price: Number(
              baseAssetValue * lpRate * Number(baseAsestPrice) +
                quoteAssetValue * lpRate * Number(quoteAssetPrice)
            ).toFixed(2),
          },
        }

        result.push(mappingData)
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
  }, [])

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
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
