import { Button } from '@nextui-org/react'
import useConnectWallet from '@/hooks/useConnectWallet'

interface ConnectCrossmarkButtonProps {
  onClose?: () => void
}

const ConnectCrossmarkButton: React.FC<ConnectCrossmarkButtonProps> = ({
  onClose,
}) => {
  const { connectCrossmark } = useConnectWallet()

  const onPress = async () => {
    await connectCrossmark()
    if (onClose) onClose()
  }

  return (
    <Button fullWidth onPress={onPress}>
      CROSSMARK
    </Button>
  )
}

export default ConnectCrossmarkButton
