'use client'

import React from 'react'
import { useState } from 'react'
import { Divider } from '@nextui-org/react'
import SwapButton from './components/SwapButton'
import SwapInput from './components/SwapInput'
import InversionButton from './components/InversionButton'
import useOfferCreate from '@/hooks/useCreateOffer'
import { coins } from '@/config/coin'

export default function DocsPage() {
  {
    /********** 状態管理 **********/
  }
  // スワップ元・スワップ先の状態を管理
  const [sourceCurrency, setSourceCurrency] = useState('')
  const [sourceValue, setSourceValue] = useState('')
  const [destinationCurrency, setDestinationCurrency] = useState('')
  const [destinationValue, setDestinationValue] = useState('')
  // スワップ処理
  const { error, isLoading, submit } = useOfferCreate()

  {
    /********** ハンドラー ***********/
  }
  // スワップボタン押下時の処理
  const handleSwap = () => {
    // ここにSwapボタンを押した際の処理を記述
    submit(
      sourceCurrency,
      sourceValue,
      destinationCurrency,
      destinationValue
    ).then(() => {
      console.log('submit')
      console.log('error', error)
    })
  }

  // 反転ボタン押下時の処理
  const handleInversion = () => {
    const sourceCurrencyTmp = sourceCurrency
    const destinationCurrencyTmp = destinationCurrency
    const sourceValueTmp = sourceValue
    const destinationValueTmp = destinationValue
    setSourceCurrency(destinationCurrencyTmp)
    setDestinationCurrency(sourceCurrencyTmp)
    setSourceValue(destinationValueTmp)
    setDestinationValue(sourceValueTmp)
  }

  // スワップ元の通貨を変更した際の処理を記述
  const handleSelectSourceCurrency = (value: string) => {
    setSourceCurrency(value)
  }

  // スワップ先の通貨を変更した際の処理を記述
  const handleSelectDestinationCurrency = (value: string) => {
    setDestinationCurrency(value)
  }

  // スワップ元の価格を変更した際の処理
  const handleInputSwapSource = (value: string) => {
    console.log('スワップ元を変更しました')
    setSourceValue(value)
    // destinationの計算
    // let destination = 10 * Math.random()
    // setDestinationValue(destination.toString());
  }

  // スワップ先の価格を変更した際の処理
  const handleInputSwapDestination = (value: string) => {
    setDestinationValue(value)
    // sourceの計算
    // let source = 10 * Math.random()
    // setSourceValue(source.toString());
  }

  return (
    <div>
      {/* メインコンテンツ */}
      <div className="flex flex-col rounded-lg border-1 border-indigo-500">
        {/* スワップタイトル */}
        <div className="flex gap-2 justify-between m-4">
          <div className="flex flex-row">
            <p className="text-md">Swap</p>
          </div>
        </div>

        <Divider />

        {/* スワップ元 */}
        <div className="m-8">
          <SwapInput
            currencyList={coins}
            currency={sourceCurrency}
            onCurrencyChange={handleSelectSourceCurrency}
            value={sourceValue}
            onValueChange={handleInputSwapSource}
          />
        </div>

        {/* スワップ通貨反転 */}
        <div className="relative">
          <Divider className="absolute top-1/2 left-0"></Divider>
          <div className="relative top-1">
            <InversionButton onClick={handleInversion} />
          </div>
        </div>

        {/* スワップ先 */}
        <div className="m-8">
          <SwapInput
            currencyList={coins}
            currency={destinationCurrency}
            onCurrencyChange={handleSelectDestinationCurrency}
            value={destinationValue}
            onValueChange={handleInputSwapDestination}
          />
        </div>

        <Divider />

        {/* スワップボタン */}
        <div className="m-4">
          <SwapButton onClick={handleSwap} isLoding={isLoading} />
        </div>
      </div>
    </div>
  )
}
