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
  refresh: () => void
}

const AmmWithdrawButton: React.FC<AmmWithdrawButtonProps> = ({
  amount1,
  amount2,
  refresh,
}) => {
  const { accountData } = useAccountContext()
  const { submit, isLoading } = useAmmWithdraw()

  const handleSubmit = async () => {
    await submit({
      account: accountData.address || '',
      asset1: amount1,
      asset2: amount2,
    })

    refresh()
  }

  return (
    <Button
      size="sm"
      isLoading={isLoading}
      isDisabled={!accountData.address}
      onPress={handleSubmit}
    >
      Withdraw
    </Button>
  )
}

export default AmmWithdrawButton
