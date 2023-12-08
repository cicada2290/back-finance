import { Button, Spinner } from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'
import useMintToken from '@/hooks/useMintToken'

interface FaucetTableMintButtonProps {
  currency: string
  issuer: string
  refresh: () => void
}

const FaucetTableMintButton: React.FC<FaucetTableMintButtonProps> = ({
  currency,
  issuer,
  refresh,
}) => {
  const { mint, isLoading } = useMintToken()

  const { accountData } = useAccountContext()

  const handlerMint = async (currency: string, issuer: string) => {
    if (!accountData.address) return

    await mint({
      currency,
      issuer,
      account: accountData.address,
      value: '10',
    })

    refresh()
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
