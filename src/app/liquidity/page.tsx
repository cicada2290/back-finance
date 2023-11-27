'use client'

import type { AmmInfo } from '@/hooks/useFetchAmmInfo'
import { useEffect, useState } from 'react'
import { useFetchAmmInfo } from '@/hooks/useFetchAmmInfo'
import AmmInfoCardList from '@/app/liquidity/components/AmmInfoCardList'
import PoolCreateButton from '@/app/liquidity/components/PoolCreateButton'
import PoolDeleteButton from '@/app/liquidity/components/PoolDeleteButton'
import TitleText from '@/components/elements/typography/TitleText'

export default function PricingPage() {
  const { fetch } = useFetchAmmInfo()

  const [ammInfoList, setAmmInfoList] = useState<AmmInfo[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch()
      console.log('[fetchAmmInfo]: response: ', response)
      setAmmInfoList(response)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="pb-10">
        <TitleText text="Liquidity" />
      </div>

      <div className="pb-10">
        <div className=" grid grid-cols-2 gap-2">
          <PoolCreateButton />
          <PoolDeleteButton />
        </div>
      </div>

      <div className="pb-10">
        <div className="grid grid-cols-3 gap-4">
          <AmmInfoCardList items={ammInfoList} />
        </div>
      </div>
    </div>
  )
}
