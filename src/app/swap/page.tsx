import React from 'react'
import { Divider, Input, Button } from '@nextui-org/react'
import { SettingsIcon } from '@/components/elements/Icons'
import { RefreshIcon } from '@/components/elements/Icons'
import { UpDownIcon } from '@/components/elements/Icons'

export default function DocsPage() {
  return (
    <div className="flex flex-col rounded-lg border-1 border-indigo-500">
      {/* スワップタイトル */}
      <div className="flex gap-2 justify-between m-4">
        <div className="flex flex-row">
          <p className="text-md">Swap</p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <Button isIconOnly aria-label="update">
              <RefreshIcon />
            </Button>
          </div>
          <div className="flex flex-col">
            <Button isIconOnly aria-label="settings">
              <SettingsIcon />
            </Button>
          </div>
        </div>
      </div>

      <Divider />

      {/* スワップ元 */}
      <div className="m-8">
        <Input
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
              >
                <option>USD</option>
                <option>ARS</option>
                <option>EUR</option>
              </select>
            </div>
          }
          type="number"
        />
      </div>

      {/* リバース */}
      <div className="relative">
        <Divider className="absolute top-1/2 left-0"></Divider>
        <Button className="relative top-1" isIconOnly>
          <UpDownIcon />
        </Button>
      </div>

      {/* スワップ先 */}
      <div className="m-8">
        <Input
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
              >
                <option>USD</option>
                <option>ARS</option>
                <option>EUR</option>
              </select>
            </div>
          }
          type="number"
        />
      </div>

      <Divider />

      <div className="m-4">
        <Button fullWidth variant="flat" color="success">
          Connect wallet
        </Button>
      </div>
    </div>
  )
}
