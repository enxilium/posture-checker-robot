import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from "@/providers"
import { Header } from "@/shared"
import { siteConfig } from "@/config/site"
import { ClientRegistrationWrapper } from "./ClientRegistrationWrapper"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Providers>
            <ClientRegistrationWrapper>
              <Header />
              <main className="flex flex-col">{children}</main>
              <SpeedInsights />
            </ClientRegistrationWrapper>
          </Providers>
        </UserProvider>
      </body>
    </html>
  )
}
