import { Button } from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'
import useTrustSet from '@/hooks/useTrustSet'

interface FaucetTableTrustSetButtonProps {
  currency: string
  issuer: string
  refresh: () => void
}

const FaucetTableTrustSetButton: React.FC<FaucetTableTrustSetButtonProps> = ({
  currency,
  issuer,
  refresh,
}) => {
  const { submit } = useTrustSet()

  const { accountData } = useAccountContext()

  const handleTrustSet = async (currency: string, issuer: string) => {
    if (!accountData.address) return

    await submit({
      account: accountData.address,
      limitAmount: {
        currency,
        issuer,
        value: '10000000000',
      },
    })

    refresh()
  }

  return (
    <Button
      size="sm"
      isDisabled={!accountData.isConnected}
      onPress={() => handleTrustSet(currency, issuer)}
    >
      Approve
    </Button>
  )
}

export default FaucetTableTrustSetButton
