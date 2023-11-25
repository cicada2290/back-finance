'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'

import { useAccountContext } from '@/context/account-context'
import { Wallets } from '@/config/wallets'

interface ConnectButtonProps {
  className?: string
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ className }) => {
  // Error state
  const [error, setError] = useState<string | null>(null)
  // Xumm state
  const [xummWss, setXummWss] = useState<WebSocket | null>(null)
  const [xummPayload, setXummPayload] = useState<{
    next: string
    pushed: boolean
    qrUrl: string
    uuid: string
    wsUrl: string
  } | null>(null)

  const { accountData, setAccountData } = useAccountContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenWalletModal,
    onOpen: onOpenWalletModal,
    onClose: onCloseWalletModal,
    onOpenChange: onOpenChangeWalletModal,
  } = useDisclosure()
  const {
    isOpen: isOpenXummLogintModal,
    onOpen: onOpenXummLoginModal,
    onClose: onCloseXummLoginModal,
    onOpenChange: onOpenChangeXummLoginModal,
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
          const res = await fetch('/api/wallet/xumm/login')
          if (res.status === 200) {
            const json = await res.json()
            console.log('json', json)
            setXummPayload(json.data)
            setXummWss(new WebSocket(json.data.wsUrl))
            onOpenXummLoginModal()
          }
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
      } else {
        console.error(error)
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

  const renderButtonLabel = () => {
    return accountData.address
      ? `${accountData.address.slice(0, 6)}...${accountData.address.slice(-6)}`
      : 'Connect'
  }

  useEffect(() => {
    if (!xummWss) return

    const handleOpen = () => {
      console.log('WebSocket Client Connected')
    }

    const handleMessage = (message: any) => {
      const data = JSON.parse(message.data)
      console.log('message', data)

      if (data.signed) {
        fetch(`/api/wallet/xumm/payload/${data.payload_uuidv4}`)
          .then((res) => res.json())
          .then((json) => {
            console.log("json", json)
            setAccountData({
              walletName: Wallets.Xumm,
              address: json.data.account,
              balance: 0,
            })
            xummWss.close()
            onCloseXummLoginModal()
          })
      }
    }

    xummWss.onopen = handleOpen
    xummWss.onmessage = handleMessage

    return () => {
      if (xummWss) {
        xummWss.onopen = null
        xummWss.onmessage = null
        xummWss.close()
      }
    }
  }, [xummWss])

  return (
    <>
      <Button className={className} variant="flat" onClick={handleButtonClick}>
        {renderButtonLabel()}
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

      <Modal
        isOpen={isOpenXummLogintModal}
        onOpenChange={onOpenChangeXummLoginModal}
      >
        <ModalContent>
          <ModalHeader>Scan to connect</ModalHeader>
          <ModalBody className="text-center">
            <p>
              Open XUMM wallet on your mobile phone and scan this QR code or
              accept the push notification.
            </p>
            <div className="flex justify-center">
              <Image width={300} alt="Xumm QR code" src={xummPayload?.qrUrl} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              fullWidth
              variant="flat"
              color="danger"
              onPress={onCloseXummLoginModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectButton
