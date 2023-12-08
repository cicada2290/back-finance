import type { OfferCreate } from 'xrpl'
import { useState } from 'react'
import crossmark from '@crossmarkio/sdk'
import { TransactionTypes } from '@/config/xrpl/transactions'
import { useAccountContext } from '@/context/accountContext'
import Xrpl from '@/libs/xrpl'

const useOfferCreate = () => {
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { accountData } = useAccountContext()

  const submit = async (
    sourceCurrency: string,
    sourceValue: string,
    destinationCurrency: string,
    destinationValue: string
  ) => {
    setIsLoading(true)
    console.log('accountData: ', accountData)
    if (!accountData.address) return null

    try {
      const xrpl = new Xrpl()
      const issuer = await xrpl.getIssuerWallet()

      const issuer_param = issuer.address
      let takerGets:
        | string
        | { currency: string; issuer: string; value: string } = ''
      let takerPays:
        | string
        | { currency: string; issuer: string; value: string } = ''
      // スワップ元
      switch (sourceCurrency) {
        case 'XRP':
          takerGets = String(Number(sourceValue) * 1000000)
          break
        default:
          takerGets = {
            currency: sourceCurrency,
            issuer: issuer_param,
            value: sourceValue,
          }
          break
      }
      // スワップ先
      switch (destinationCurrency) {
        case 'XRP':
          takerPays = destinationValue
          break
        default:
          takerPays = {
            currency: destinationCurrency,
            issuer: issuer_param,
            value: destinationValue,
          }
          break
      }
      const request: OfferCreate = {
        TransactionType: TransactionTypes.OfferCreate,
        Account: accountData.address,
        TakerGets: takerGets,
        TakerPays: takerPays,
        Flags: 65536,
      }
      console.log('request: ', request)
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
