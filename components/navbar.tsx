
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SearchBar } from '../components/search-bar'
import { User2, ShoppingCart, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { cn } from "@/lib/utils"

const Navbar = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const [isOpen, setIsOpen] = useState(false)
  // For Next.js 13+, usePathname is preferred, but fallback for SSR
  // const pathname = usePathname ? usePathname() : (typeof window !== 'undefined' ? window.location.pathname : '')

  const navLinks = [
    { href: '/shop', label: 'SHOP' },
    { href: '/women', label: 'WOMEN' },
    { href: '/men', label: 'MEN' },
    { href: '/about', label: 'ABOUT' },
  ]

  return (
    <div>
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-light tracking-wide text-stone-900 flex md:flex-row flex-col md:items-baseline items-center gap-1 md:gap-3">
                <span>TTTSL</span>
                <span className="swanky-brand text-sm leading-none">swanky by ellery</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href === '/shop' && pathname === '/')
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={
                        isActive
                          ? 'text-stone-900 font-medium border-b-2 border-stone-900 pb-1'
                          : 'text-stone-600 swanky-link transition-colors text-sm tracking-wide'
                      }
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Search and Icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/auth/login"
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Account"
                >
                  <User2 className="w-5 h-5" />
                </Link>
                <Link
                  href="/cart"
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Link>
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="text-stone-600 hover:text-stone-900 transition-colors p-2"
                      aria-label="Open menu"
                    >
                      <Menu className="w-6 h-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                    <div className="flex flex-col h-full">
                      {/* Mobile Search */}
                      <div className="p-4">
                        <SearchBar />
                      </div>
                      {/* Mobile Navigation */}
                      <nav className="flex-1">
                        <div className="px-4 py-2">
                          {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href === '/shop' && pathname === '/')
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  'block py-2 text-base tracking-wide',
                                  isActive
                                    ? 'text-stone-900 font-medium'
                                    : 'text-stone-600'
                                )}
                              >
                                {link.label}
                              </Link>
                            )
                          })}
                        </div>
                      </nav>
                      {/* Mobile Account & Cart */}
                      <div className="border-t border-stone-200 p-4">
                        <div className="flex flex-col space-y-4">
                          <Link
                            href="/auth/login"
                            className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <User2 className="w-5 h-5" />
                            <span>Account</span>
                          </Link>
                          <Link
                            href="/cart"
                            className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Cart</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
