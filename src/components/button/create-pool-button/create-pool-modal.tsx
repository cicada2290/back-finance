'use client'

import { useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import SelectInput from '@/components/button/create-pool-button/select-input'
import { useSubmitAMMCreate } from '@/hooks/useSubmitAMMCreate'

const coins = [
  {
    label: 'BTC',
    value: 'BTC',
  },
  {
    label: 'ETH',
    value: 'ETH',
  },
  {
    label: 'BNB',
    value: 'BNB',
  },
]

interface CreatePoolModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreatePoolModal: React.FC<CreatePoolModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [baseAsset, setBaseAsset] = useState(new Set([coins[0].value]))
  const [quoteAsset, setQuoteAsset] = useState(new Set([coins[1].value]))
  const [baseAssetAmount, setBaseAssetAmount] = useState('0')
  const [quoteAssetAmount, setQuoteAssetAmount] = useState('0')

  const { submit } = useSubmitAMMCreate()

  const handleSubmitButton = async () => {
    const asset1 = Array.from(baseAsset)[0]
    const asset2 = Array.from(quoteAsset)[0]

    const response = await submit({
      asset1: {
        currency: asset1,
        value: baseAssetAmount,
      },
      asset2: {
        currency: asset2,
        value: quoteAssetAmount,
      },
      tradingFee: 5000,
    })

    console.log('[handleSubmitButton]: response: ', response)

    onClose()
  }

  return (
    <Modal isOpen={isOpen} hideCloseButton={true}>
      <ModalContent>
        <ModalHeader>Create pool</ModalHeader>
        <ModalBody className="flex justify-center">
          <div className="grid grid-cols-2 gap-2">
            <SelectInput
              label="Select a asset"
              items={coins}
              value={baseAsset}
              SetValue={setBaseAsset}
            />
            <Input
              type="number"
              label="asset1 balanse"
              value={baseAssetAmount}
              onChange={(e) => setBaseAssetAmount(e.target.value)}
            />
            <SelectInput
              label="Select a asset2"
              items={coins}
              value={quoteAsset}
              SetValue={setQuoteAsset}
            />
            <Input
              type="number"
              label="asset2 balanse"
              value={quoteAssetAmount}
              onChange={(e) => setQuoteAssetAmount(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth color="primary" onPress={handleSubmitButton}>
            SUBMIT
          </Button>
          <Button fullWidth onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreatePoolModal
