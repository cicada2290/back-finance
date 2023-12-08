import { useState } from 'react'
import { NetworkIds } from '@/config/networks'
import { TransactionTypes } from '@/config/xrpl/transactions'
import Xrpl from '@/libs/xrpl'
import { createDidDocument } from '@/utils/auth'

const useDidSet = () => {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    setIsLoading(true)
    const client = new Xrpl()

    const account = client.getUserWallet()

    const didDocumentHex = createDidDocument({
      address: account.address,
      networkId: NetworkIds.default,
    })

    const response = await client.didSet({
      TransactionType: TransactionTypes.DIDSet,
      Account: account.address,
      DIDDocument: didDocumentHex,
    })

    console.info('[DIDSet] response: ', response)
    setIsLoading(false)
  }

  return {
    // state
    isLoading,
    // function
    submit,
  }
}

export default useDidSet
