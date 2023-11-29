import { Button, useDisclosure } from '@nextui-org/react'
import ConnectWalletModal from './SelectWalletModal'

const SelectWalletModalButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>Connect</Button>
      <ConnectWalletModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  )
}

export default SelectWalletModalButton
