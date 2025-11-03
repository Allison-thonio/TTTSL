import React from 'react'
import Link from 'next/link'

const footer = () => {
  return (
    <div>
                    {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-baseline gap-3">
                <span>TTTSL</span>
                <span className="swanky-brand text-sm leading-none">swanky by ellery</span>
              </h3>
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
            <p>&copy; 2024 <span className="font-semibold">TTTSL</span> <span className="swanky-brand text-sm align-middle">swanky by ellery</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default footer