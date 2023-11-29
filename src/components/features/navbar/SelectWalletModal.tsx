'use client'

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import ConnectCrossmarkButton from '@/components/features/navbar/ConnectCrossmarkButton'
import ConnectXummButton from '@/components/features/navbar/ConnectXummButton'

interface ConnectWalletModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

const SelectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Connect Wallet</ModalHeader>
        <ModalBody>
          <ConnectCrossmarkButton onClose={onClose} />
          <ConnectXummButton />
        </ModalBody>
        <ModalFooter>
          <Button fullWidth variant="flat" color="danger" onPress={onClose}>
            CLOSE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SelectWalletModal
