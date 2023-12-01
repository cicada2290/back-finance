import { Button } from '@nextui-org/react'
import useCreateToken from '@/hooks/useCreateToken'

interface FaucetTableCreateTokenButtonProps {
  currency: string
  issuer: string
  refresh: () => void
}

const FaucetTableCreateTokenButton: React.FC<
  FaucetTableCreateTokenButtonProps
> = ({ currency, refresh }) => {
  const { submit, isLoading } = useCreateToken()

  const handleCreateToken = async () => {
    await submit({ currency })
    await refresh()
  }

  return (
    <Button size="sm" isLoading={isLoading} onPress={handleCreateToken}>
      Create token
    </Button>
  )
}

export default FaucetTableCreateTokenButton
