import { Button } from '@nextui-org/react'
import useCreatePool from '@/hooks/useCreatePool'

interface AmmCreatePoolButtonProps {
  asset1: {
    currency: string
  }
  asset2: {
    currency: string
  }
  isDisabled: boolean
  refresh: () => void
}

const AmmCreatePoolButton: React.FC<AmmCreatePoolButtonProps> = ({
  asset1,
  asset2,
  isDisabled,
  refresh,
}) => {
  const { submit, isLoading } = useCreatePool()

  const handleSubmit = async () => {
    await submit({
      asset1,
      asset2,
    })
    await refresh()
  }

  return (
    <Button
      size="sm"
      isDisabled={isDisabled}
      isLoading={isLoading}
      onPress={handleSubmit}
    >
      Create Pool
    </Button>
  )
}

export default AmmCreatePoolButton
