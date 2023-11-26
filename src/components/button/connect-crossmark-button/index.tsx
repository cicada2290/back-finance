'use client'

import { Wallets } from '@/config/wallets'
import { Button } from '@nextui-org/react'
import useWallet from '@/hooks/use-wallet'
import { useAccountContext } from '@/context/account-context'

interface ConnectCrossmarkButtonProps {
  setError: (error: string | null) => void
  onClose: () => void
}

const ConnectCrossmarkButton: React.FC<ConnectCrossmarkButtonProps> = ({
  setError,
  onClose,
}) => {
  const { isInstalled, login } = useWallet()

  const { setAccountData } = useAccountContext()

  const handleButtonClick = async () => {
    setError(null)

    if (!isInstalled(Wallets.Crossmark)) {
      setError('Crossmark wallet is not installed')
      return
    }

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
