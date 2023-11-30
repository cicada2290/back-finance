import { AccountSetAsfFlags } from 'xrpl'
import { useMemo } from 'react'
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
import { networks } from '@/config/site'
import { truncateAddress } from '@/utils/string'
import useFaucetTable from '@/hooks/useFaucetTable'
import FaucetTableMintButton from '@/app/faucet/components/FaucetTableMintButton'
import FaucetTableTrustSetButton from '@/app/faucet/components/FaucetTableTrustSetButton'

import { newClient, fetchColdWallet, fetchHotWallet } from '@/utils/xrpl'

const FaucetTable = () => {
  const {
    data: items,
    fetchData,
    loadingState,
    setLoadingState,
  } = useFaucetTable()

  const createToken = async () => {
    const currency = 'SOL'
    // const currency = Math.random().toString(36).slice(-3).toUpperCase()
    console.log('create: ', currency)

    const client = newClient(networks.default)
    await client.connect()

    const issuerWallet = await fetchColdWallet()
    const res1 = await client.submitAndWait(
      {
        TransactionType: 'AccountSet',
        Account: issuerWallet.address,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple,
      },
      { wallet: issuerWallet }
    )
    console.log('AccountSet: ', res1)

    const operatorWallet = await fetchHotWallet()
    const res2 = await client.submitAndWait(
      {
        TransactionType: 'TrustSet',
        Account: operatorWallet.address,
        LimitAmount: {
          issuer: issuerWallet.address,
          currency: currency,
          value: '100',
        },
      },
      { wallet: operatorWallet }
    )
    console.log('TrustSet: ', res2)

    const res3 = await client.submitAndWait(
      {
        TransactionType: 'Payment',
        Account: issuerWallet.address,
        Destination: operatorWallet.address,
        Amount: {
          issuer: issuerWallet.address,
          currency: currency,
          value: '5000',
        },
      },
      { wallet: issuerWallet }
    )
    console.log('Payment: ', res3)

    console.log('create token: ', currency)

    await client.disconnect()
  }

  const topContent = useMemo(() => {
    return (
      <div>
        <Button onPress={createToken}>Create Token</Button>
      </div>
    )
  }, [])

  return (
    <Table
      isStriped
      topContent={topContent}
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
                  <FaucetTableTrustSetButton
                    currency={item.currency}
                    issuer={item.issuer}
                    refresh={fetchData}
                    setLoadingState={setLoadingState}
                  />
                )}
                {item.isTrusted && (
                  <FaucetTableMintButton
                    currency={item.currency}
                    issuer={item.issuer}
                    refresh={fetchData}
                    setLoadingState={setLoadingState}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default FaucetTable
