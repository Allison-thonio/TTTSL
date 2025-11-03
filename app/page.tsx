"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import SplashScreen from "@/components/splash-screen"
import Link from "next/link"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if user has seen the splash screen
    const splashSeen = localStorage.getItem("splashSeen")
    if (splashSeen) {
      setShowSplash(false)
    }
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
 
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-muted">
        <img
          src="/placeholder.svg?key=l3oas"
          alt="TTTSL Fashion Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Timeless Style, Transparent Values</h1>
          <p className="text-lg md:text-xl mb-8 text-pretty">
            Discover ethically-made fashion that transcends trends. Every piece tells a story of craftsmanship and
            conscious creation.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/women">
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?key=fuvj4"
                      alt="Women's Collection"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Women</h3>
                      <p className="text-sm opacity-90">Effortless elegance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/men">
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?key=ychyp"
                      alt="Men's Collection"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Men</h3>
                      <p className="text-sm opacity-90">Modern essentials</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* About the Brand Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-balance">About TTTSL</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              We believe in radical transparency and ethical production. Every garment is crafted with care, using
              sustainable materials and fair labor practices. Our timeless designs transcend seasonal trends, creating
              pieces you'll treasure for years to come.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold mb-2">Sustainable</h3>
                <p className="text-sm text-muted-foreground">Eco-friendly materials and processes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold mb-2">Ethical</h3>
                <p className="text-sm text-muted-foreground">Fair wages and working conditions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold mb-2">Timeless</h3>
                <p className="text-sm text-muted-foreground">Designs that never go out of style</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-balance">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-8 text-pretty">
              Be the first to know about new collections, sustainability initiatives, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TTTSL</h3>
              <p className="text-sm opacity-80">
                Timeless style with transparent values. Fashion that makes a difference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/women" className="hover:opacity-100 transition-opacity">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/men" className="hover:opacity-100 transition-opacity">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/sale" className="hover:opacity-100 transition-opacity">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/about" className="hover:opacity-100 transition-opacity">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:opacity-100 transition-opacity">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:opacity-100 transition-opacity">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/help" className="hover:opacity-100 transition-opacity">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:opacity-100 transition-opacity">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:opacity-100 transition-opacity">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="hover:opacity-100 transition-opacity">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 TTTSL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}