import { Button } from '@nextui-org/react'
import useAmmDeposit from '@/hooks/useAmmDeposit'
import { useAccountContext } from '@/context/accountContext'

interface AmmDepositButtonProps {
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

const AmmDepositButton: React.FC<AmmDepositButtonProps> = ({
  amount1,
  amount2,
}) => {
  const { accountData } = useAccountContext()
  const { submit } = useAmmDeposit()

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
      Deposit
    </Button>
  )
}

export default AmmDepositButton
