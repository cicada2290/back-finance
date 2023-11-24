'use client'

import { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'

import { useAccountContext } from '@/context/account-context'

enum WalletService {
  Crossmark = 'crossmark',
  GemWallet = 'gemwallet',
}

interface ConnectButtonProps {
  className?: string
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ className }) => {
  const [error, setError] = useState<string | null>(null)
  const { accountData, setAccountData } = useAccountContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const checkWalletInstallation = (
    walletType: WalletService,
    isWalletInstalled: boolean
  ) => {
    if (!window.xrpl || !isWalletInstalled) {
      throw new Error(`Please install ${walletType}`)
    }
  }

  const handleConnect = async (service: WalletService) => {
    setError(null)
    try {
      switch (service) {
        case WalletService.Crossmark:
          checkWalletInstallation(
            WalletService.Crossmark,
            window.xrpl.isCrossmark
          )
          const { response } = await window.xrpl.crossmark.signInAndWait()

          setAccountData({
            address: response.data.address,
          })
          break
        case WalletService.GemWallet:
          checkWalletInstallation(
            WalletService.GemWallet,
            window.xrpl.gem?.isGemWallet
          )
          console.log('Gem Wallet')
          break
        default:
          throw new Error('Unsupported wallet service')
      }
      onClose()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  const handleButtonClick = () => {
    if (!accountData.address) {
      onOpen()
    }
  }

  const renderButtonLabel = () => {
    return accountData.address
      ? `${accountData.address.slice(0, 6)}...${accountData.address.slice(-6)}`
      : 'Connect'
  }

  return (
    <>
      <Button className={className} variant="flat" onClick={handleButtonClick}>
        {renderButtonLabel()}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          setError(null)
          onOpenChange()
        }}
      >
        <ModalContent>
          <ModalHeader>Connect wallet</ModalHeader>
          <ModalBody>
            <p className="text-red-500">{error}</p>
            <Button onPress={() => handleConnect(WalletService.Crossmark)}>
              Crossmark
            </Button>
            <Button onPress={() => handleConnect(WalletService.GemWallet)}>
              Gem Wallet
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              fullWidth
              variant="flat"
              color="danger"
              onPress={() => {
                setError(null)
                onClose()
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectButton
