
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SearchBar } from '../components/search-bar'
import { User2, ShoppingCart, Menu, ChevronDown } from 'lucide-react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const [isShopOpen, setIsShopOpen] = useState(false)
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

            <div className="hidden md:flex items-center space-x-6">
              <SearchBar />
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

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-4">
              <SearchBar />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-[400px] border-r border-stone-200">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4">
                    {/* Shop Dropdown */}
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-lg font-light"
                        onClick={() => setIsShopOpen(!isShopOpen)}
                      >
                        SHOP
                        <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isShopOpen ? 'rotate-180' : ''}`} />
                      </Button>
                      <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isShopOpen ? 'h-auto mt-2 opacity-100' : 'h-0 opacity-0'}`}>
                        <Link
                          href="/men"
                          className="block py-3 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Men
                        </Link>
                        <Link
                          href="/women"
                          className="block py-3 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Women
                        </Link>
                      </div>
                    </div>
                    <Link
                      href="/about"
                      className="block py-3 text-lg font-light text-stone-600 hover:text-stone-900 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      ABOUT
                    </Link>
                    <hr className="border-stone-200 my-4" />
                    <Link
                      href="/auth/login"
                      className="flex items-center space-x-3 py-3 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <User2 className="w-5 h-5" />
                      <span className="text-lg font-light">Account</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center space-x-3 py-3 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span className="text-lg font-light">Cart</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
