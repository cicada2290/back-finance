'use client'

import type { Data } from '@/hooks/useAmmInfo'
import {
  Image,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import AmmCreatePoolButton from '@/app/liquidity/components/AmmCreatePoolButton'
import AmmDepositButton from '@/app/liquidity/components/AmmDepositButton'
import AmmWithdrawButton from '@/app/liquidity/components/AmmWithdrawButton'

type LoadingState =
  | 'loading'
  | 'sorting'
  | 'loadingMore'
  | 'error'
  | 'idle'
  | 'filtering'

const AmmInfoTable = ({
  items,
  loadingState,
  refresh,
}: {
  items: Data[]
  loadingState?: LoadingState
  refresh: () => void
}) => {
  return (
    <Table isStriped>
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
              <p>${item.lp.volumeUsd.toLocaleString()}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.asset1.value} {item.asset1.currency}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.asset2.value} {item.asset2.currency}
              </p>
            </TableCell>
            <TableCell>
              <p>${item.my.volumeUsd}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.my.amount1} {item.asset1.currency}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.my.amount2} {item.asset2.currency}
              </p>
            </TableCell>
            <TableCell className="grid grid-cols-1 gap-2">
              <AmmCreatePoolButton
                asset1={{
                  currency: item.asset1.currency,
                }}
                asset2={{
                  currency: item.asset2.currency,
                }}
                isDisabled={item.isCreated}
                refresh={refresh}
              />
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
                refresh={refresh}
              />
              <AmmWithdrawButton
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
                refresh={refresh}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default AmmInfoTable
