'use client'

import { useEffect, useState } from 'react'
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
}) => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setError(null)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Connect wallet</ModalHeader>
        <ModalBody>
          <p className="text-red-500">{error}</p>
          <ConnectCrossmarkButton onClose={onClose} setError={setError} />
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
}

export default SelectWalletModal
