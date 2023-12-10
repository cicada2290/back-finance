'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
// Wagmi
import { WagmiConfig, configureChains, createConfig, sepolia } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
// NextAuth
import { SessionProvider } from 'next-auth/react'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
)

const config = createConfig({
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children, themeProps = {} }: ProvidersProps) {
  const router = useRouter()

  return (
    <WagmiConfig config={config}>
      <SessionProvider>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}
