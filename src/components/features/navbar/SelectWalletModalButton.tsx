import { Button, useDisclosure } from '@nextui-org/react'
import SelectWalletModal from '@/components/features/navbar/SelectWalletModal'

const SelectWalletModalButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>Connect</Button>
      <SelectWalletModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  )
}

export default SelectWalletModalButton
