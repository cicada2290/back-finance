'use client'

import type { Data } from '@/hooks/useAmmInfo'
import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Image,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import AmmDepositButton from '@/app/liquidity/components/AmmDepositButton'
import PoolCreateButton from '@/app/liquidity/components/PoolCreateButton'

type LoadingState =
  | 'loading'
  | 'sorting'
  | 'loadingMore'
  | 'error'
  | 'idle'
  | 'filtering'

const AmmInfoTable = ({
  items,
  isLoading,
}: {
  items: Data[]
  isLoading?: boolean
}) => {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading')

  useEffect(() => {
    if (isLoading) {
      setLoadingState('loading')
    } else {
      setLoadingState('idle')
    }
  }, [isLoading])

  const topContent = useMemo(() => {
    return (
      <div>
        <PoolCreateButton />
      </div>
    )
  }, [])

  return (
    <Table isStriped topContent={topContent}>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>TLV</TableColumn>
        <TableColumn>Staked</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        loadingState={loadingState}
        loadingContent={<Spinner color="secondary" />}
      >
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="text-center">
                <p className="pb-2 font-bold">{item.name}</p>
              </div>
              <div className="flex">
                <div className="relative w-[40px] h-[35px]">
                  <Image
                    className="absolute top-0 left-0 z-10"
                    width={35}
                    alt="icon"
                    src={item.asset1.icon}
                  />
                  <Image
                    className="absolute top-0 left-5"
                    width={35}
                    alt="icon"
                    src={item.asset2.icon}
                  />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p>${item.lp.price.toLocaleString()}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.asset1.value} {item.asset1.currency}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.asset2.value} {item.asset2.currency}
              </p>
            </TableCell>
            <TableCell>
              <p>$0</p>
              <p className="text-bold text-sm capitalize text-default-400">
                0 {item.asset1.currency}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                0 {item.asset2.currency}
              </p>
            </TableCell>
            <TableCell className="grid grid-cols-1 gap-2">
              <Button size="sm">Detail</Button>
              <AmmDepositButton
                amount1={{
                  currency: item.asset1.currency,
                  issuer:
                    item.asset1.currency === 'XRP'
                      ? ''
                      : (item.asset1.issuer as string),
                  value: '100',
                }}
                amount2={{
                  currency: item.asset2.currency,
                  issuer:
                    item.asset1.currency === 'XRP'
                      ? ''
                      : (item.asset1.issuer as string),
                  value: '0',
                }}
              />
              <Button size="sm">Withdraw</Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default AmmInfoTable
