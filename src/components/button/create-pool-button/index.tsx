import { Button, useDisclosure } from '@nextui-org/react'
import CreatePoolModal from '@/components/button/create-pool-button/create-pool-modal'

const CreatePoolButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>CREATE POOL</Button>
      <CreatePoolModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default CreatePoolButton
