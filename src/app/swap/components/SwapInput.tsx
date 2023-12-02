'use client'

import { Input } from '@nextui-org/react'
import { Asset } from '@/config/coin'

interface SwapInputProps {
  currencyList: Asset[]
  currency: string
  onCurrencyChange: (value: string) => void
  value: string
  onValueChange: (value: string) => void
}

const SwapInput: React.FC<SwapInputProps> = ({
  currencyList,
  currency,
  onCurrencyChange,
  value,
  onValueChange,
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder="0.00"
      labelPlacement="outside"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">$</span>
        </div>
      }
      endContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            className="outline-none border-0 bg-transparent text-default-400 text-small"
            id="currency"
            name="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
          >
            {currencyList.map((asset, index) => (
              <option key={index} value={asset.currency}>
                {asset.currency}
              </option>
            ))}
          </select>
        </div>
      }
      type="number"
    />
  )
}

export default SwapInput
