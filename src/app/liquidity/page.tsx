'use client'

import { useEffect } from 'react'
import { Button, Spinner } from '@nextui-org/react'
import AmmCardList from '@/app/liquidity/components/AmmCardList'
import useAmmInfo from '@/hooks/useAmmInfo'
import { useAccountContext } from '@/context/accountContext'

export default function LiquidityPage() {
  const { accountData } = useAccountContext()
  const { data, fetchData, isLoading } = useAmmInfo()

  useEffect(() => {
    console.log('accountData', accountData)
  }, [accountData])

  return (
    <div>
      <div className="pb-10">
        {accountData.isConnected ? (
          isLoading ? (
            <Spinner color="secondary" />
          ) : (
            <>
              <Button className="mb-3" onPress={fetchData}>
                Refresh
              </Button>
              <AmmCardList items={data} refresh={fetchData} />
            </>
          )
        ) : (
          <h1>Connect to a wallet to use the faucet</h1>
        )}
      </div>
    </div>
  )
}
