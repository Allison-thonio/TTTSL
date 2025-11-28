"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import SplashScreen from "@/components/splash-screen"
import StackCards from "@/components/stack-cards"
import Link from "next/link"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, Users, Star } from "lucide-react"

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
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <StackCards />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?key=l3oas"
            alt="TTTSL Fashion Collection"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="swanky-brand text-3xl md:text-4xl text-primary mb-4 block">
              swanky by ellery
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 text-balance leading-[1.1]">
              Timeless Style, <br />
              <span className="font-serif italic text-primary-foreground/90">Transparent Values</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Discover ethically-made fashion that transcends trends. Every piece tells a story of craftsmanship and conscious creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shop">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white text-white hover:bg-white/10 hover:text-white transition-all">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-light tracking-tight mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Curated collections for every style.</p>
            </div>
            <Link href="/shop" className="group flex items-center text-sm font-medium tracking-widest hover:text-primary transition-colors">
              VIEW ALL <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/women">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative h-[600px] overflow-hidden rounded-sm cursor-pointer"
              >
                <img
                  src="/placeholder.svg?key=fuvj4"
                  alt="Women's Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-10 left-10 text-white">
                  <span className="text-sm tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Collection</span>
                  <h3 className="text-5xl font-serif italic mb-2">Women</h3>
                  <p className="text-white/80 font-light">Effortless elegance for the modern muse.</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/men">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative h-[600px] overflow-hidden rounded-sm cursor-pointer"
              >
                <img
                  src="/placeholder.svg?key=ychyp"
                  alt="Men's Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-10 left-10 text-white">
                  <span className="text-sm tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Collection</span>
                  <h3 className="text-5xl font-serif italic mb-2">Men</h3>
                  <p className="text-white/80 font-light">Refined essentials for the contemporary man.</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* About the Brand Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-stone-200 rounded-lg overflow-hidden">
                <img src="/placeholder.svg?key=about" alt="About TTTSL" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-background p-8 rounded-full flex items-center justify-center shadow-xl hidden md:flex">
                <div className="text-center">
                  <span className="block text-4xl font-bold text-primary">100%</span>
                  <span className="text-xs tracking-widest uppercase">Ethical</span>
                </div>
              </div>
            </div>

            <div>
              <span className="swanky-brand text-2xl text-primary mb-4 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-balance leading-tight">
                Crafted with Care, <br />
                <span className="font-serif italic text-muted-foreground">Designed for Life.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed font-light">
                We believe in radical transparency and ethical production. Every garment is crafted with care, using
                sustainable materials and fair labor practices. Our timeless designs transcend seasonal trends, creating
                pieces you'll treasure for years to come.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Sustainable Materials</h3>
                    <p className="text-muted-foreground font-light">Eco-friendly fabrics that love the planet back.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Ethical Production</h3>
                    <p className="text-muted-foreground font-light">Fair wages and safe working conditions for all.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Timeless Design</h3>
                    <p className="text-muted-foreground font-light">Pieces designed to last beyond the season.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Button variant="link" className="text-lg p-0 h-auto hover:text-primary transition-colors">
                  Read more about our journey <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-balance">Stay in the Loop</h2>
            <p className="text-background/70 mb-10 text-lg font-light">
              Be the first to know about new collections, sustainability initiatives, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30"
              />
              <Button className="h-12 px-8 bg-background text-foreground hover:bg-background/90 font-medium">
                Subscribe
              </Button>
            </div>
            <p className="mt-6 text-xs text-background/40">
              By subscribing you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-foreground py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <Link href="/" className="block">
                <span className="text-2xl font-light tracking-[0.2em]">TTTSL</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Timeless style with transparent values. Fashion that makes a difference.
              </p>
              <div className="flex gap-4 pt-2">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 bg-muted rounded-full hover:bg-primary/20 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-muted rounded-full hover:bg-primary/20 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-muted rounded-full hover:bg-primary/20 transition-colors cursor-pointer"></div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-6 tracking-wide text-sm uppercase">Shop</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/women" className="hover:text-foreground transition-colors">Women</Link></li>
                <li><Link href="/men" className="hover:text-foreground transition-colors">Men</Link></li>
                <li><Link href="/accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
                <li><Link href="/sale" className="hover:text-foreground transition-colors">Sale</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 tracking-wide text-sm uppercase">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/sustainability" className="hover:text-foreground transition-colors">Sustainability</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 tracking-wide text-sm uppercase">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="/returns" className="hover:text-foreground transition-colors">Returns & Exchanges</Link></li>
                <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping Info</Link></li>
                <li><Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; 2024 TTTSL. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}