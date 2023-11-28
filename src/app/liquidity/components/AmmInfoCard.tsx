'use client'

import { Card, CardHeader, CardBody, Snippet } from '@nextui-org/react'
import DepositModalButton from '@/components/features/liquidity/DepositModalButton'
import LinkButton from '@/components/elements/button/LinkButton'

interface AmmInfoCardProps {
  title: string
  lpTokenValue: string
  tradingFee: number
  account: string
}

const AmmInfoCard: React.FC<AmmInfoCardProps> = ({
  title,
  lpTokenValue,
  tradingFee,
  account,
}) => {
  return (
    <Card className="min-w-[400px]">
      <CardHeader className="font-bold flex justify-between">
        {title}{' '}
        <Snippet className="pl-3" size="sm" symbol="" codeString={account}>
          {`${account.substring(0, 7)}...${account.substring(
            account.length - 6
          )}`}
        </Snippet>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-bold">LP Amount</span>: {lpTokenValue}
            </p>
            <p>
              <span className="font-bold">Trading Fee</span>:{' '}
              {tradingFee / 1000} %
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <LinkButton href="#">DETAIL</LinkButton>
            <DepositModalButton />
            <LinkButton href="#">WITHDRAW</LinkButton>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default AmmInfoCard
