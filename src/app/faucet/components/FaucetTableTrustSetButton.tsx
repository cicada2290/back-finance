import type { LoadingState } from '@/hooks/useFaucetTable'
import { Button } from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'
import useTrustSet from '@/hooks/useTrustSet'

interface FaucetTableTrustSetButtonProps {
  currency: string
  issuer: string
  refresh: () => void
  setLoadingState: (state: LoadingState) => void
}

const FaucetTableTrustSetButton: React.FC<FaucetTableTrustSetButtonProps> = ({
  currency,
  issuer,
  refresh,
  setLoadingState,
}) => {
  const { submit } = useTrustSet()

  const { accountData } = useAccountContext()

  const handleTrustSet = async (currency: string, issuer: string) => {
    if (!accountData.address) return

    setLoadingState('loading')

    await submit({
      account: accountData.address,
      limitAmount: {
        currency,
        issuer,
        value: '10000000000',
      },
    })

    refresh()

    setLoadingState('idle')
  }

  return (
    <Button
      size="sm"
      isDisabled={!accountData.isConnected}
      onPress={() => handleTrustSet(currency, issuer)}
    >
      Allow to receive
    </Button>
  )
}

export default FaucetTableTrustSetButton
