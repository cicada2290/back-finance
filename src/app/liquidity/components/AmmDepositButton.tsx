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
  refresh: () => void
}

const AmmDepositButton: React.FC<AmmDepositButtonProps> = ({
  amount1,
  amount2,
  refresh,
}) => {
  const { accountData } = useAccountContext()
  const { submit, isLoading } = useAmmDeposit()

  const handleSubmit = async () => {
    await submit({
      account: accountData.address || '',
      asset1: amount1,
      asset2: amount2,
    })
    await refresh()
  }

  return (
    <Button
      size="sm"
      isLoading={isLoading}
      isDisabled={!accountData.address}
      onPress={handleSubmit}
    >
      Deposit
    </Button>
  )
}

export default AmmDepositButton
