import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
  import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
 
export const metadata: Metadata = {
  title: "TTTSL - Timeless Style, Transparent Values",
  description:
    "Discover ethically-made fashion that transcends trends. Every piece tells a story of craftsmanship and conscious creation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
  
       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
  
     </html>
  )
}
