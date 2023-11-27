'use client'

import type { AmmInfo } from '@/hooks/use-amm'
import { useEffect, useState } from 'react'
import { title } from '@/components/primitives'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react'
import CreatePoolButton from '@/components/button/create-pool-button'
import DeletePoolButton from '@/components/button/delete-pool-button'
import useAmm from '@/hooks/use-amm'

export default function PricingPage() {
  const { fetchAmmInfo } = useAmm()

  const [ammInfoList, setAmmInfoList] = useState<AmmInfo[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetchAmmInfo()
      console.log('[fetchAmmInfo]: response: ', response)
      setAmmInfoList(response)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className={title()}>Liquidity</h1>

      <div className="pt-10 grid grid-cols-2 gap-2">
        <CreatePoolButton />
        <DeletePoolButton />
      </div>

      <div className="pt-10 grid grid-cols-2 gap-4">
        {ammInfoList.map((ammInfo) => {
          return (
            <Card
              key={`${ammInfo.amount.currency}/${ammInfo.amount2.currency}`}
            >
              <CardHeader>
                {ammInfo.amount.currency}/{ammInfo.amount2.currency}
              </CardHeader>
              <CardBody>
                <p>
                  Asset1: {ammInfo.amount.value} {ammInfo.amount.currency}
                </p>
                <p>
                  Asset2: {ammInfo.amount2.value} {ammInfo.amount2.currency}
                </p>
                <p>LP: {ammInfo.lp_token.value}</p>
                <p>Fee: {ammInfo.trading_fee / 1000} %</p>
              </CardBody>
              <CardFooter>
                <Button className="mr-2" fullWidth color="primary">
                  Deposit
                </Button>
                <Button fullWidth variant="light" color="primary">
                  Withdraw
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
