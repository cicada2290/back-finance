'use client'

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'

import { useAccountContext } from '@/context/account-context'

interface ConnectButtonProps {
  className?: string
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ className }) => {
  const { accountData, setAccountData } = useAccountContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleConnect = async () => {
    if (!window.xrpl) {
      console.log('walletをインストールしてください')
      return
    }

    if (window.xrpl.isCrossmark) {
      const { response } = await window.xrpl.crossmark.signInAndWait()
      setAccountData({ address: response.data.address })
    }
  }

  const handleDisconnect = () => {
    setAccountData({ address: '' })
    onClose()
  }

  const handleButtonClick = () => {
    if (accountData.address) {
      onOpen()
    } else {
      handleConnect()
    }
  }

  const renderButtonLabel = () => {
    return accountData.address
      ? `${accountData.address.slice(0, 6)}...${accountData.address.slice(-6)}`
      : 'Connect'
  }

  return (
    <>
      <Button className={className} variant="flat" onClick={handleButtonClick}>
        {renderButtonLabel()}
      </Button>

      <Modal isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>My Wallet</ModalHeader>
          <ModalBody>
            <p>Address:</p>
            <p>{accountData.address}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectButton
