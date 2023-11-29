'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'
import WalletInfoModal from '@/components/button/open-wallet-info-modal-button/wallet-info-modal'
import { truncateAddress } from '@/utils/string'

const OpenWalletInfoModalButton = () => {
  const { accountData } = useAccountContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>
        {truncateAddress(accountData.address || '')}
      </Button>

      <WalletInfoModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  )
}

export default OpenWalletInfoModalButton
