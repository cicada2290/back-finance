import type { Data } from '@/hooks/useAmmInfo'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Tooltip,
} from '@nextui-org/react'
import AmmCreatePoolButton from '@/app/liquidity/components/AmmCreatePoolButton'
import AmmDepositButton from '@/app/liquidity/components/AmmDepositButton'
import AmmWithdrawButton from '@/app/liquidity/components/AmmWithdrawButton'

interface AmmCardListProps {
  items: Data[]
  refresh: () => void
}

const AmmCardList: React.FC<AmmCardListProps> = ({ items, refresh }) => {
  return (
    <div className="flex justify-center grid gap-4 grid-cols-3">
      {items.map((item, key) => (
        <Card key={key} className="min-w-[275px]">
          <CardHeader className="flex gap-4">
            <div className="relative w-[40px] h-[35px]">
              <Image
                className="absolute top-0 left-0 z-10"
                width={35}
                alt="icon"
                src={item.asset1.icon}
              />
              <Image
                className="absolute top-0 left-5"
                width={35}
                alt="icon"
                src={item.asset2.icon}
              />
            </div>
            <div className="flex flex-col text-left ml-3">
              <p className="font-bold">{item.name}</p>
              {item.isCreated && (
                <Tooltip content={item.lp.account}>
                  <p className="">{`${item.lp.account.slice(
                    0,
                    7
                  )}...${item.lp.account.slice(-6)}`}</p>
                </Tooltip>
              )}
            </div>
          </CardHeader>
          <CardBody className="grid gap-4 grid-cols-2 text-center">
            <div className="pb-2">
              <Tooltip content="Total Locked Value">
                <p className="mb-2 text-sm font-bold">TLV</p>
              </Tooltip>
              <p className="text-sm">
                {item.lp.volumeUsd.toLocaleString()} USD
              </p>
              <p className="text-sm text-default-400">
                {item.asset1.value.toLocaleString()} {item.asset1.currency}
              </p>
              <p className="text-sm text-default-400">
                {item.asset2.value.toLocaleString()} {item.asset2.currency}
              </p>
            </div>
            <div>
              <Tooltip content="Personal Locked Value">
                <p className="mb-2 text-sm font-bold">PLV</p>
              </Tooltip>
              <p className="text-sm">
                {item.my.volumeUsd.toLocaleString()} USD
              </p>
              <p className="text-sm text-default-400">
                {item.my.amount1.toLocaleString()} {item.asset1.currency}
              </p>
              <p className="text-sm text-default-400">
                {item.my.amount2.toLocaleString()} {item.asset2.currency}
              </p>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex grid gap-2">
            {!item.isCreated && (
              <AmmCreatePoolButton
                asset1={{
                  currency: item.asset1.currency,
                }}
                asset2={{
                  currency: item.asset2.currency,
                }}
                isDisabled={item.isCreated}
                refresh={refresh}
              />
            )}
            {item.isCreated && (
              <AmmDepositButton
                amount1={{
                  currency: item.asset1.currency,
                  issuer:
                    item.asset1.currency === 'XRP'
                      ? ''
                      : (item.asset1.issuer as string),
                  value: '1000',
                }}
                amount2={{
                  currency: item.asset2.currency,
                  issuer:
                    item.asset1.currency === 'XRP'
                      ? ''
                      : (item.asset1.issuer as string),
                  value: '0',
                }}
                refresh={refresh}
              />
            )}
            {item.isCreated && (
              <AmmWithdrawButton
                amount1={{
                  currency: item.asset1.currency,
                  issuer:
                    item.asset1.currency === 'XRP'
                      ? ''
                      : (item.asset1.issuer as string),
                  value: '100',
                }}
                amount2={{
                  currency: item.asset2.currency,
                  issuer:
                    item.asset1.currency === 'XRP'
                      ? ''
                      : (item.asset1.issuer as string),
                  value: '0',
                }}
                refresh={refresh}
              />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default AmmCardList
