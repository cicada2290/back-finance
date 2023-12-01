import { Button } from '@nextui-org/react'
import useAmmWithdraw from '@/hooks/useAmmWithdraw'
import { useAccountContext } from '@/context/accountContext'

interface AmmWithdrawButtonProps {
  amount1: {
    currency: string
    issuer: string
    value: string
  }
  amount2: {
    currency: string
    issuer: string
    value: string
  }
}

const AmmWithdrawButton: React.FC<AmmWithdrawButtonProps> = ({
  amount1,
  amount2,
}) => {
  const { accountData } = useAccountContext()
  const { submit } = useAmmWithdraw()

  return (
    <Button
      size="sm"
      isDisabled={!accountData.address}
      onPress={() =>
        submit({
          account: accountData.address || '',
          asset1: amount1,
          asset2: amount2,
        })
      }
    >
      Withdraw
    </Button>
  )
}

export default AmmWithdrawButton
