'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from '@nextui-org/react'
import { coins } from '@/config/coin'
import { truncateAddress } from '@/utils/string'
import { useAccountContext } from '@/context/accountContext'
import useMintToken from '@/hooks/useMintToken'
import useTrustSet from '@/hooks/useTrustSet'
import { networks } from '@/config/site'
import { requestAccountLines } from '@/utils/xrpl'

type LoadingState =
  | 'loading'
  | 'sorting'
  | 'loadingMore'
  | 'error'
  | 'idle'
  | 'filtering'

export default function FaucetPage() {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading')
  const [items, setItems] = useState<
    {
      currency: string
      issuer: string
      icon: string
      isTrusted: boolean
      balance: string
    }[]
  >([])

  const { accountData } = useAccountContext()

  const { mint, isLoading } = useMintToken()
  const { submit } = useTrustSet()

  const fetchTrustInfo = async () => {
    if (!accountData.address) return null

    const { result } = await requestAccountLines({
      network: networks.devAmm,
      account: accountData.address,
    })

    return result.lines
  }

  const loadItems = async () => {
    setLoadingState('loading')

    const trustInfo = await fetchTrustInfo()
    console.log('[trustInfo]', trustInfo)

    const coinlist = []
    for (const coin of coins) {
      if (coin.currency === 'XRP') continue

      let isTrusted = false
      let balane = '0'
      if (trustInfo) {
        isTrusted = trustInfo.some(
          (trust) =>
            trust.currency === coin.currency && trust.account === coin.issuer
        )
        balane =
          trustInfo.find(
            (trust) =>
              trust.currency === coin.currency && trust.account === coin.issuer
          )?.balance || '0'
      }

      coinlist.push({
        currency: coin.currency,
        issuer: coin.issuer || '',
        icon: coin.icon || '',
        isTrusted: isTrusted,
        balance: balane,
      })
    }

    setItems(coinlist)
    setLoadingState('idle')
  }

  useEffect(() => {
    loadItems()
    if (accountData.isConnected) {
      fetchTrustInfo()
    }
  }, [accountData])

  const handleTrustSet = async (currency: string, issuer: string) => {
    if (!accountData.address) return

    await submit({
      account: accountData.address,
      limitAmount: {
        currency,
        issuer,
        value: '10000000000',
      },
    })
    // refresh
    loadItems()
  }

  const handlerMint = async (currency: string, issuer: string) => {
    if (!accountData.address) return

    setLoadingState('loading')

    await mint({
      currency,
      issuer,
      value: '10',
      account: accountData.address,
    })

    await loadItems()
  }

  return (
    <div>
      <Table
        isStriped
        classNames={{
          table: 'min-h-[250px]',
        }}
      >
        <TableHeader>
          <TableColumn>Currency</TableColumn>
          <TableColumn>Balance</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          loadingState={loadingState}
          loadingContent={<Spinner color="secondary" />}
        >
          {(item) => (
            <TableRow key={item.currency}>
              <TableCell>
                <User
                  avatarProps={{ radius: 'lg', src: item.icon }}
                  description={truncateAddress(item.issuer)}
                  name={item.currency}
                >
                  {item.currency}
                </User>
              </TableCell>
              <TableCell>{item.balance}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  {!item.isTrusted && (
                    <Button
                      size="sm"
                      isDisabled={!accountData.isConnected}
                      onPress={() => handleTrustSet(item.currency, item.issuer)}
                    >
                      Allow to receive
                    </Button>
                  )}
                  {item.isTrusted && (
                    <Button
                      size="sm"
                      isLoading={isLoading}
                      spinner={<Spinner size="sm" color="secondary" />}
                      onPress={() => handlerMint(item.currency, item.issuer)}
                    >
                      Receive 10 {item.currency}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
