"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Link from "next/link"
import { Filter, Grid, List } from "lucide-react"

export default function MenPage() {
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [products, setProducts] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
    setProducts(savedProducts)
  }, [])

  // Filter products for men
  const filteredProducts = products.filter((product) => {
    if (product.category !== "men") return false
    if (priceRange !== "all") {
      const price = product.price
      switch (priceRange) {
        case "under-50":
          if (price >= 50) return false
          break
        case "50-100":
          if (price < 50 || price > 100) return false
          break
        case "100-200":
          if (price < 100 || price > 200) return false
          break
        case "over-200":
          if (price <= 200) return false
          break
      }
    }
    return true
  })

  // Sorting logic for filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "newest":
      default:
        return (b.createdAt || 0) - (a.createdAt || 0)
    }
  })

  function clearFilters() {
    setPriceRange("all")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50">
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light text-stone-900 mb-4 tracking-wide">Men's Collection</h1>
              <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Discover our curated selection of men's fashion and essentials. Products below are added by the admin and tagged for men.
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-stone-600 hover:text-stone-900"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 border-stone-200">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="over-200">Over $200</SelectItem>
                </SelectContent>
              </Select>
              {priceRange !== "all" && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-stone-500">
                  Clear
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-stone-600">
                {sortedProducts.length} {sortedProducts.length === 1 ? "item" : "items"}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-stone-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-stone-200 rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-stone-100" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-stone-100" : ""}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-600 mb-4 text-lg">No products available yet.</p>
              <p className="text-sm text-stone-500">Products added by the admin will appear here.</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-600 mb-4 text-lg">No men's products found matching your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="border-stone-300 text-stone-600 bg-transparent">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"
              }
            >
              {sortedProducts.map((product: any) => (
                <div key={product.id} className="group">
                  <Link href={`/product/${product.id}`}>
                    {viewMode === "grid" ? (
                      <div className="bg-white">
                        <div className="relative overflow-hidden bg-stone-100">
                          <img
                            src={product.image || "/placeholder.svg?height=400&width=300&text=Product"}
                            alt={product.name}
                            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="py-4">
                          <h3 className="font-light text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-stone-600 text-sm">${product.price}</p>
                          {product.category && (
                            <p className="text-stone-400 text-xs mt-1 uppercase tracking-wide">{product.category}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-6 bg-white p-6 group-hover:bg-stone-50 transition-colors">
                        <div className="w-32 h-40 bg-stone-100 overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg?height=160&width=128&text=Product"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-light text-stone-900 text-lg mb-2 group-hover:text-stone-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-stone-600 mb-2">${product.price}</p>
                          {product.description && (
                            <p className="text-stone-500 text-sm leading-relaxed mb-2">{product.description}</p>
                          )}
                          {product.category && (
                            <Badge variant="outline" className="text-xs text-stone-500 border-stone-300">
                              {product.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
