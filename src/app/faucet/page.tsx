'use client'

import FaucetTable from '@/app/faucet/components/FaucetTable'
import useFaucetTable from '@/hooks/useFaucetTable'
import { useAccountContext } from '@/context/accountContext'

export default function FaucetPage() {
  const { data, fetchData, loadingState } = useFaucetTable()
  const { accountData } = useAccountContext()

  return (
    <div>
      {accountData.isConnected ? (
        <FaucetTable
          items={data}
          fetchData={fetchData}
          loadingState={loadingState}
        />
      ) : (
        <h1>Connect to a wallet to use the faucet</h1>
      )}
    </div>
  )
}
