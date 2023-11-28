'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import DepositModal from './DepositModal'

const DepositModalButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>DEPOSIT</Button>

      <DepositModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  )
}

export default DepositModalButton
