"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import Header from "@/components/header"

interface Product {
  id: number
  name: string
  price: number
  image: string | null
  category?: string
  description?: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterCategory, setFilterCategory] = useState("all")

  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      setProducts(savedProducts)

      if (query) {
        const filtered = savedProducts.filter(
          (product: Product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(query.toLowerCase())),
        )
        setFilteredProducts(filtered)
      } else {
        setFilteredProducts(savedProducts)
      }

      setIsLoading(false)
    }

    loadProducts()
  }, [query])

  useEffect(() => {
    let filtered = [...filteredProducts]

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((product) => product.category === filterCategory)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep relevance order (original search result order)
        break
    }

    setFilteredProducts(filtered)
  }, [sortBy, filterCategory])

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-foreground flex items-baseline gap-3">
                <span>TTTSL</span>
                <span className="swanky-brand text-sm leading-none">swanky by ellery</span>
              </Link>
              <div className="flex items-center space-x-4">
                <SearchBar />
                <Link href="/cart" className="text-foreground hover:text-primary transition-colors">
                  Cart (0)
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-balance">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category ?? "")}
                  className={filterCategory === category ? "bg-primary text-primary-foreground" : "bg-transparent"}
                >
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-border rounded-md bg-background text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2 text-balance">No products found</h2>
            <p className="text-muted-foreground mb-6 text-pretty">
              {query
                ? `We couldn't find any products matching "${query}". Try adjusting your search terms.`
                : "No products are currently available."}
            </p>
            <Link href="/shop">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Search className="w-12 h-12 text-muted-foreground opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        {product.category && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg font-semibold">${product.price}</p>
                      {product.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}