import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

interface AmmDepositModalProps {
  isOpen: boolean
}

const AmmDepositModal: React.FC<AmmDepositModalProps> = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Deposit</ModalHeader>
      <ModalContent>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AmmDepositModal
