'use client'

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'

interface WalletInfoModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

const WalletInfoModal: React.FC<WalletInfoModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  const { accountData, setAccountData } = useAccountContext()

  const handleDisconnect = () => {
    setAccountData({
      isConnected: false,
      walletName: null,
      address: null,
      balance: 0,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Wallet</ModalHeader>
        <ModalBody className="text-center">
          <p className="text-sm">Connecting to {accountData.walletName}</p>
          <p>{accountData.address}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            variant="flat"
            color="danger"
            onPress={handleDisconnect}
          >
            Disconnect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WalletInfoModal
