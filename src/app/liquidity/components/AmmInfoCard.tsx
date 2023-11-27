'use client'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react'

interface AmmInfoCardProps {
  title: string
  asset1: {
    currency: string
    value: string
  }
  asset2: {
    currency: string
    value: string
  }
  lpTokenValue: string
  tradingFee: number
}

const AmmInfoCard: React.FC<AmmInfoCardProps> = ({
  title,
  asset1,
  asset2,
  lpTokenValue,
  tradingFee,
}) => {
  return (
    <Card>
      <CardHeader>
        <p className="font-bold">{title}</p>
      </CardHeader>
      <CardBody>
        <p>
          Asset1: {asset1.value} {asset1.currency}
        </p>
        <p>
          Asset2: {asset2.value} {asset2.currency}
        </p>
        <p>LP: {lpTokenValue}</p>
        <p>Fee: {tradingFee / 1000} %</p>
      </CardBody>
      <CardFooter className="grid grid-rows-3 grid-flow-col gap-2">
        <Button className="" color="default" fullWidth>
          Detail
        </Button>
        <Button className="" color="default" fullWidth>
          Deposit
        </Button>
        <Button color="default" fullWidth>
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AmmInfoCard
