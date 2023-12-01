'use client'

import React from "react"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'

interface SwapSuccessModalProps {
    isOpen: boolean
    onClose: () => void
}

const SwapSuccessModal: React.FC<SwapSuccessModalProps> = ({
    isOpen,
    onClose,
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalContent>
        <ModalHeader>Success</ModalHeader>
        <ModalBody>
          <h1>swap was successful</h1>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} color="success">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SwapSuccessModal