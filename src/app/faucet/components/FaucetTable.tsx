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
import { TransactionTypes } from '@/config/xrpl/transactions'
import { truncateAddress } from '@/utils/string'
import Xrpl from '@/libs/xrpl'
import useFaucetTable from '@/hooks/useFaucetTable'
import FaucetTableMintButton from '@/app/faucet/components/FaucetTableMintButton'
import FaucetTableTrustSetButton from '@/app/faucet/components/FaucetTableTrustSetButton'

const FaucetTable = () => {
  const {
    data: items,
    fetchData,
    loadingState,
    setLoadingState,
  } = useFaucetTable()

  const createToken = async () => {
    const currency = 'BNB'
    // const currency = Math.random().toString(36).slice(-3).toUpperCase()
    console.log('create: ', currency)

    const client = new Xrpl()

    const issuerWallet = client.getIssuerWallet()
    const operatorWallet = client.getOperatorWallet()

    const accountSetResponse = await client.accountSet({
      TransactionType: TransactionTypes.AccountSet,
      Account: issuerWallet.address,
      SetFlag: AccountSetAsfFlags.asfDefaultRipple,
    })

    console.log('[AccountSet] ', accountSetResponse)

    const trustSetResponse = await client.trustSetForOperator({ currency })
    console.log('[TrustSet] ', trustSetResponse)

    const paymentResponse = await client.paymentFromIssuer({
      to: operatorWallet.address,
      currency,
      amount: '5000',
    })

    console.log('[Payment] ', paymentResponse)

    console.log('create token: success: ', currency)
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
