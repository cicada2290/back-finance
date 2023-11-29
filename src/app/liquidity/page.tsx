'use client'

import { Spinner } from '@nextui-org/react'
import { useFetchAmmInfo } from '@/hooks/useFetchAmmInfo'
import AmmInfoCardList from '@/app/liquidity/components/AmmInfoCardList'
import PoolCreateButton from '@/app/liquidity/components/PoolCreateButton'
import PoolDeleteButton from '@/app/liquidity/components/PoolDeleteButton'

export default function LiquidityPage() {
  const { data, isLoading } = useFetchAmmInfo()

  return (
    <div>
      <div className="pb-10">
        <div className=" grid grid-cols-2 gap-2">
          <PoolCreateButton />
          <PoolDeleteButton />
        </div>
      </div>

      <div className="pb-10">
        <div className="grid grid-cols-1 gap-4">
          {isLoading && <Spinner size="lg" color="secondary" />}
          {!isLoading && <AmmInfoCardList items={data} />}
        </div>
      </div>
    </div>
  )
}
