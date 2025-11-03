
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SearchBar } from '../components/search-bar'
import { User2, ShoppingCart } from 'lucide-react'

const Navbar = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
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

            <div className="flex items-center space-x-6">
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
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
