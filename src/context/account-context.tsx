'use client'

import type { ReactNode } from 'react'
import type { AccountData } from '@/types/account'
import { createContext, useContext, useState } from 'react'

interface AccountContextType {
  accountData: AccountData
  setAccountData: (accountData: AccountData) => void
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const useAccountContext = () => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error(
      'useAccountContext must be used within a AccountContextProvider'
    )
  }
  return context
}

export const AccountContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [accountData, setAccountData] = useState<AccountData>({
    address: null,
  })

  const contextValue = {
    accountData,
    setAccountData,
  }

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  )
}
