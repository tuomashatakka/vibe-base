import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer, Header } from '@/components/layouts'
import { AppStateProvider } from '@/lib/state'
import './globals.css'


export const metadata: Metadata = {
  title:       'vibe-scaffold',
  description: 'Minimal semantic Next.js boilerplate — Bun, TypeScript, AI SDK, parallel routes.',
}

interface RootLayoutProps {
  children: ReactNode
  panel:    ReactNode // ← parallel route slot, rendered from src/app/@panel
}

export default function RootLayout ({ children, panel }: RootLayoutProps) {
  return <html suppressHydrationWarning lang='en' data-theme='system'>
    <body>
      <AppStateProvider>
        <Header />
        <main>{children}</main>
        {panel}
        <Footer />
      </AppStateProvider>
    </body>
  </html>
}
