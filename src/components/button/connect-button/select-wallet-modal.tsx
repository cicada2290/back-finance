'use client'

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

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
        <Button>Crossmark</Button>
        <Button>Xumm</Button>
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
