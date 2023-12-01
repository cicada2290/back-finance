'use client'

import React from "react"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'

interface SwapErrorModalProps {
    isOpen: boolean
    onClose: () => void
}

const SwapErrorModal: React.FC<SwapErrorModalProps> = ({
    isOpen,
    onClose,
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>
          <h1>swap failed</h1>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} color="danger">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SwapErrorModal