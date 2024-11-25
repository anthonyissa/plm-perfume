import './globals.css'
import { Inter } from 'next/font/google'
import { PLMNav } from '@/components/plm-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Perfume PLM Dashboard',
  description: 'Product Lifecycle Management for Perfumes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PLMNav />
        {children}
      </body>
    </html>
  )
}

