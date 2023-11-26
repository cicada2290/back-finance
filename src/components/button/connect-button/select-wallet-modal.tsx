'use client'

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import ConnectCrossmarkButton from '@/components/button/connect-crossmark-button'
import ConnectXummButton from '@/components/button/connect-xumm-button'

interface SelectWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
}

const SelectWalletModal: React.FC<SelectWalletModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
}) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      <ModalHeader>Connect wallet</ModalHeader>
      <ModalBody>
        <ConnectCrossmarkButton onClose={onClose} />
        <ConnectXummButton />
      </ModalBody>
      <ModalFooter>
        <Button fullWidth variant="flat" color="danger" onPress={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default SelectWalletModal
