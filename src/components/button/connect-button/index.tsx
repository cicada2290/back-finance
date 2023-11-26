'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import SelectWalletModal from '@/components/button/connect-button/select-wallet-modal'

const ConnectButton = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        onClick={onOpen}
      >
        Connect
      </Button>

      <SelectWalletModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export default ConnectButton
