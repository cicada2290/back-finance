'use client'

import { useEffect } from 'react'
import { Button } from '@nextui-org/button'

import { useAccountContext } from '@/context/account-context'

interface ConnectButtonProps {
  className?: string
}

const ConnectButton = (props: ConnectButtonProps) => {
  const { className } = props

  const { accountData, setAccountData } = useAccountContext()

  const handleConnectButtonClick = async () => {
    if (!window.xrpl) {
      console.log('walletをインストールしてください')
    } else if (window.xrpl.isCrossmark) {
      const { response } = await window.xrpl.crossmark.signInAndWait()

      setAccountData({
        address: response.data.address,
      })
    }
  }

  const connectButton = () => {
    return (
      <Button
        className={className}
        variant="flat"
        onClick={handleConnectButtonClick}
      >
        Connect
      </Button>
    )
  }

  const connectedButton = () => {
    return (
      <Button
        className={className}
        variant="flat"
      >
        {`${accountData.address?.slice(0, 6)}...${accountData.address?.slice(-6)}`}
      </Button>
    )
  }

  return (
    <>
      {accountData.address ? connectedButton() : connectButton()}
    </>
  )
}

export default ConnectButton
