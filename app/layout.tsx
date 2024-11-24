import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PLMNav } from "@/components/plm-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perfume PLM Dashboard",
  description: "Product Lifecycle Management for Perfumes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <PLMNav />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

