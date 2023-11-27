'use client'

import type { AmmInfo } from '@/hooks/useFetchAmmInfo'
import AmmInfoCard from './AmmInfoCard'

interface AmmInfoCardListProps {
  items: AmmInfo[]
}

const AmmInfoCardList: React.FC<AmmInfoCardListProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <AmmInfoCard
            key={index}
            title={`${item.amount.currency}/${item.amount2.currency}`}
            asset1={item.amount}
            asset2={item.amount2}
            lpTokenValue={item.lp_token.value}
            tradingFee={item.trading_fee}
          />
        )
      })}
    </>
  )
}

export default AmmInfoCardList
