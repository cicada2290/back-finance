import type { LoadingState } from '@/hooks/useFaucetTable'
import { Button, Spinner } from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'
import useMintToken from '@/hooks/useMintToken'

interface FaucetTableMintButtonProps {
  currency: string
  issuer: string
  refresh: () => void
  setLoadingState: (state: LoadingState) => void
}

const FaucetTableMintButton: React.FC<FaucetTableMintButtonProps> = ({
  currency,
  issuer,
  refresh,
  setLoadingState,
}) => {
  const { mint, isLoading } = useMintToken()

  const { accountData } = useAccountContext()

  const handlerMint = async (currency: string, issuer: string) => {
    if (!accountData.address) return

    setLoadingState('loading')

    await mint({
      currency,
      issuer,
      account: accountData.address,
      value: '10',
    })

    refresh()

    setLoadingState('idle')
  }

  return (
    <Button
      size="sm"
      isLoading={isLoading}
      spinner={<Spinner size="sm" color="secondary" />}
      onPress={() => handlerMint(currency, issuer)}
    >
      Receive 10 {currency}
    </Button>
  )
}

export default FaucetTableMintButton
