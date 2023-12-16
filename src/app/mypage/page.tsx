/*
'use client'

// React
import { useCallback } from 'react'
// Components
import { Button } from '@nextui-org/react'
// Siwe
import { SiweMessage } from 'siwe'
// wagmi
/*
import {
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage,
  useDisconnect,
} from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
// NextAuth
import { getCsrfToken } from 'next-auth/react'

export default function MyPage() {
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()

  const handleLogin = useCallback(async () => {
    try {
      console.info('handleLogin: ', address)

      // Get CSRF Token
      const nonce = await getCsrfToken()

      // Create a message
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Welcome to VanillaSwap!!',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce,
      })

      // Create a signature
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      console.info('signature: ', signature)

      // Create a callback url
      const callbackUrl = '/'
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      })
    } catch (error: unknown) {
      console.error(error)
    }
  }, [address, chain?.id, signMessageAsync])

  return (
    <div>
      <div className="mb-4">
        {isConnected ? <p>connected: {address}</p> : <p>not connect</p>}
      </div>
      {!isConnected && (
        <div className="pb-10">
          <Button onPress={() => connect()}>EVM Connect</Button>
        </div>
      )}
      {isConnected && (
        <div className="pb-10">
          <Button onPress={() => disconnect()}>Disconnect</Button>
        </div>
      )}
      {isConnected && (
        <div className="pb-10">
          <Button onPress={() => handleLogin()}>Login</Button>
        </div>
      )}
    </div>
  )
}
*/
