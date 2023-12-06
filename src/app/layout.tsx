import '@/styles/globals.css'
import { fontSans } from '@/config/fonts'
import Navbar from '@/components/layouts/Navbar'
import clsx from 'clsx'

import { AccountContextProvider } from '@/context/accountContext'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <AccountContextProvider>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </AccountContextProvider>
        </Providers>
      </body>
    </html>
  )
}
