'use client'

import { Button } from '@nextui-org/react'
import { useAccountContext } from '@/context/accountContext'
import useDidSet from '@/hooks/useDidSet'

export default function MyPage() {
  const { accountData } = useAccountContext()
  const { submit: submitDidSet } = useDidSet()

  const handleSubmitDidSet = async () => {
    const response = await submitDidSet()
    console.log('response: ', response)
  }

  return (
    <div className="flex justify-center gap-2">
      {!accountData.isSignedIn && (
        <Button
          onPress={handleSubmitDidSet}
          isDisabled={!accountData.isConnected}
        >
          SignUp
        </Button>
      )}
      {accountData.isSignedIn && (
        <Button isDisabled={!accountData.isConnected}>SignOut</Button>
      )}
    </div>
  )
}
