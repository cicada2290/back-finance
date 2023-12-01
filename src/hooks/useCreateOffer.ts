import type { OfferCreate } from 'xrpl'
import { useState } from 'react'
import crossmark from '@crossmarkio/sdk'
import { TransactionTypes } from '@/config/xrpl/transactions'
import { useAccountContext } from '@/context/accountContext'

const useOfferCreate = () => {
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { accountData } = useAccountContext()

  const submit = async () => {
    setIsLoading(true)

    if (!accountData.address) return null

    try {
      const request: OfferCreate = {
        TransactionType: TransactionTypes.OfferCreate,
        Account: accountData.address,
        /*
        TakerPays: {
          currency: 'BTC',
          issuer: 'rLxCx6CCdbjaSM81PEYf6GQSPNAcbKQQDZ',
          value: '0.015',
        },
        TakerGets: "10000000",
        */
        TakerGets: {
          currency: 'BTC',
          issuer: 'rLxCx6CCdbjaSM81PEYf6GQSPNAcbKQQDZ',
          value: '0.015',
        },
        TakerPays: '10000000',
        Flags: 65536,
      }
      const response = await crossmark.signAndSubmit(request)
      console.info('[OfferCreate]: ', response)
    } catch (error: unknown) {
      console.error('Error fetching data:', error)
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('An unknown error occurred'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // state
    error,
    isLoading,
    // function
    submit,
  }
}

export default useOfferCreate
