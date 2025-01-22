import { NextAppProvider } from '@toolpad/core/nextjs'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Aceon',
  description: 'Aceon - Soluções Inteligentes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="32x32" type="image/png" href="/logo.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextAppProvider>{children}</NextAppProvider>
      </body>
    </html>
  )
}
