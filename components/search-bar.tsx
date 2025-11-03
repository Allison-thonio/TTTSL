"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  image: string | null
  category?: string
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      const timeoutId = setTimeout(() => {
        searchProducts(query)
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const searchProducts = (searchQuery: string) => {
    const products = JSON.parse(localStorage.getItem("adminProducts") || "[]")
    const filteredProducts = products
      .filter(
        (product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      .slice(0, 5) // Limit to 5 results for dropdown

    setResults(filteredProducts)
    setIsOpen(filteredProducts.length > 0)
    setIsLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 w-64 focus:w-80 transition-all duration-200"
            onFocus={() => query.length > 0 && setIsOpen(true)}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={handleClear}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mx-auto mb-2"></div>
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Search className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${product.price} {product.category && `• ${product.category}`}
                      </p>
                    </div>
                  </Link>
                ))}
                <div className="p-3 border-t bg-muted/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(query)}`)
                      setIsOpen(false)
                    }}
                  >
                    View all results for "{query}"
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">No products found for "{query}"</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
