import {
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from '@nextui-org/react'
import { truncateAddress } from '@/utils/string'
import FaucetTableMintButton from '@/app/faucet/components/FaucetTableMintButton'
import FaucetTableTrustSetButton from '@/app/faucet/components/FaucetTableTrustSetButton'
import FaucetTableCreateTokenButton from '@/app/faucet/components/FaucetTableCreateTokenButton'

interface FaucetTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  fetchData: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadingState: any
}

const FaucetTable: React.FC<FaucetTableProps> = ({
  items,
  fetchData,
  loadingState,
}) => {
  return (
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
                {!item.isMinted && (
                  <FaucetTableCreateTokenButton
                    currency={item.currency}
                    issuer={item.issuer}
                    refresh={fetchData}
                  />
                )}
                {item.isMinted && !item.isTrusted && (
                  <FaucetTableTrustSetButton
                    currency={item.currency}
                    issuer={item.issuer}
                    refresh={fetchData}
                  />
                )}
                {item.isMinted && item.isTrusted && (
                  <FaucetTableMintButton
                    currency={item.currency}
                    issuer={item.issuer}
                    refresh={fetchData}
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
