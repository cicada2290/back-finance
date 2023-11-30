'use client'

import useAmmInfo from '@/hooks/useAmmInfo'
import AmmInfoTable from '@/app/liquidity/components/AmmInfoTable'

export default function LiquidityPage() {
  const { data, isLoading } = useAmmInfo()

  return (
    <div>
      <div className="pb-10">
        <AmmInfoTable items={data} isLoading={isLoading} />
      </div>
    </div>
  )
}
