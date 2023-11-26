'use client'

import { Wallets } from '@/config/wallets'
import { Button } from '@nextui-org/react'
import useWallet from '@/hooks/use-wallet'
import { useAccountContext } from '@/context/account-context'

interface ConnectCrossmarkButtonProps {
  onClose: () => void
}

const ConnectCrossmarkButton: React.FC<ConnectCrossmarkButtonProps> = ({
  onClose,
}) => {
  const { login } = useWallet()

  const { setAccountData } = useAccountContext()

  const handleButtonClick = async () => {
    const wallet = await login(Wallets.Crossmark)

    setAccountData({
      isConnected: true,
      walletName: Wallets.Crossmark,
      address: wallet.address,
      balance: 0,
    })

    onClose()
  }

  return <Button onPress={handleButtonClick}>Crossmark</Button>
}

export default ConnectCrossmarkButton
