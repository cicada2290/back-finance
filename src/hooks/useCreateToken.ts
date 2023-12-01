import { useState } from 'react'
import { AccountSetAsfFlags } from 'xrpl'
import Xrpl from '@/libs/xrpl'
import { TransactionTypes } from '@/config/xrpl/transactions'

const useCreateToken = () => {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async ({ currency }: { currency: string }) => {
    setIsLoading(true)

    const client = new Xrpl()

    const issuerWallet = client.getIssuerWallet()
    const operatorWallet = client.getOperatorWallet()

    const accountSetResponse = await client
      .accountSet({
        TransactionType: TransactionTypes.AccountSet,
        Account: issuerWallet.address,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple,
      })
      .catch((error) => {
        console.error(error)
      })

    console.log('[AccountSet] ', accountSetResponse)

    const trustSetResponse = await client
      .trustSetForOperator({ currency })
      .catch((error) => {
        console.error(error)
      })
    console.log('[TrustSet] ', trustSetResponse)

    const paymentResponse = await client
      .paymentFromIssuer({
        to: operatorWallet.address,
        currency,
        amount: '5000',
      })
      .catch((error) => {
        console.error(error)
      })

    console.log('[Payment] ', paymentResponse)

    console.log('create token: success: ', currency)

    setIsLoading(false)
  }

  return {
    // state
    isLoading,
    // function
    submit,
  }
}

export default useCreateToken
