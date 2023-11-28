'use client'

import { useMemo, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

interface DepositModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  const [baseAmount, setBaseAmount] = useState('')
  const [quoteAmount, setQuoteAmount] = useState('')

  const validateNumber = (value: string) => value.match(/^[0-9]+(\.[0-9]+)?$/)

  const isInvalidBaseAmount = useMemo(() => {
    if (baseAmount === '') return false

    return validateNumber(baseAmount) ? false : true
  }, [baseAmount])

  const isInvalidQuouteAmount = useMemo(() => {
    if (quoteAmount === '') return false

    return validateNumber(quoteAmount) ? false : true
  }, [quoteAmount])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Deposit</ModalHeader>
        <ModalBody>
          <div>
            <Input
              type="text"
              label="BTC"
              defaultValue="0"
              isInvalid={isInvalidBaseAmount}
              color={isInvalidBaseAmount ? 'danger' : 'default'}
              errorMessage={
                isInvalidBaseAmount && 'Please enter a valid number'
              }
              onValueChange={setBaseAmount}
            />
          </div>
          <div>
            <Input
              type="text"
              label="ETH"
              defaultValue="0"
              isInvalid={isInvalidQuouteAmount}
              color={isInvalidQuouteAmount ? 'danger' : 'default'}
              errorMessage={
                isInvalidQuouteAmount && 'Please enter a valid number'
              }
              onValueChange={setQuoteAmount}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            DEPOSIT
          </Button>
          <Button onPress={onClose}>CLOSE</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DepositModal
