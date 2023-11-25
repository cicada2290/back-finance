'use client'

import { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import { Xumm } from 'xumm'

import { useAccountContext } from '@/context/account-context'
import { Wallets, XUMM } from '@/config/wallets'

interface ConnectButtonProps {
  className?: string
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ className }) => {
  const [error, setError] = useState<string | null>(null)
  const { accountData, setAccountData } = useAccountContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenWalletModal,
    onOpen: onOpenWalletModal,
    onClose: onCloseWalletModal,
    onOpenChange: onOpenChangeWalletModal,
  } = useDisclosure()

  const checkWalletInstallation = (
    walletType: Wallets,
    isWalletInstalled: boolean
  ) => {
    if (!window.xrpl || !isWalletInstalled) {
      throw new Error(`Please install ${walletType}`)
    }
  }

  const handleConnect = async (service: Wallets) => {
    setError(null)
    try {
      switch (service) {
        case Wallets.Crossmark:
          checkWalletInstallation(Wallets.Crossmark, window.xrpl.isCrossmark)
          const { response } = await window.xrpl.crossmark.signInAndWait()
          console.info('[Crossmark] response: ', response)

          const client = new window.xrpl.js.Client(response.data.network.wss)

          await client.connect()

          const balance = await client
            .getXrpBalance(response.data.address)
            .catch((error: unknown) => {
              console.error(error)
              return 0
            })

          await client.disconnect()

          setAccountData({
            walletName: Wallets.Crossmark,
            address: response.data.address,
            balance: balance,
          })
          break
        case Wallets.Xumm:
          const xumm = new Xumm(XUMM.API_KEY)
          console.log('Xumm1: ', xumm)
          break
        case Wallets.GemWallet:
          checkWalletInstallation(
            Wallets.GemWallet,
            window.xrpl.gem?.isGemWallet
          )
          console.log('Gem Wallet')
          break
        default:
          throw new Error('Unsupported wallet service')
      }
      onClose()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  const onDisconnect = async () => {
    try {
      onCloseWalletModal()
      setAccountData({
        walletName: null,
        address: null,
        balance: 0,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  const handleButtonClick = () => {
    if (!accountData.address) {
      onOpen()
    } else {
      onOpenWalletModal()
    }
  }

  return (
    <>
      <Button className={className} variant="flat" onClick={handleButtonClick}>
        {accountData.address
          ? `${accountData.address.slice(0, 6)}...${accountData.address.slice(
              -6
            )}`
          : 'Connect'}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          setError(null)
          onOpenChange()
        }}
      >
        <ModalContent>
          <ModalHeader>Connect wallet</ModalHeader>
          <ModalBody>
            <p className="text-red-500">{error}</p>
            <Button onPress={() => handleConnect(Wallets.Crossmark)}>
              Crossmark
            </Button>
            <Button onPress={() => handleConnect(Wallets.Xumm)}>Xumm</Button>
            <Button onPress={() => handleConnect(Wallets.GemWallet)}>
              Gem Wallet
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              fullWidth
              variant="flat"
              color="danger"
              onPress={() => {
                setError(null)
                onClose()
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenWalletModal} onOpenChange={onOpenChangeWalletModal}>
        <ModalContent>
          <ModalHeader>Wallet</ModalHeader>
          <ModalBody className="text-center">
            <p className="text-sm">Connecting to {accountData.walletName}</p>
            <p>{accountData.address}</p>
            <p className="text-3xl font-bold">{accountData.balance} XRP</p>
          </ModalBody>
          <ModalFooter>
            <Button
              fullWidth
              variant="flat"
              color="danger"
              onPress={onDisconnect}
            >
              Disconnect
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectButton
