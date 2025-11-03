"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { getSiteImage } from "@/lib/utils"
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Upload,
  Save,
  X,
} from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: string
  image: string | null
  description?: string
  category?: string
  specifications?: { [key: string]: string }
  sku?: string
  brand?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [products, setProducts] = useState<Product[]>([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    sku: "",
    specifications: {} as { [key: string]: string },
    image: null as File | null,
    brand: "TTTSL",
  })
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")
  const [siteImages, setSiteImages] = useState<{ [k: string]: string }>({})
  const [currency, setCurrency] = useState<string>("USD")

  useEffect(() => {
    loadDashboardData()
    const savedCurrency = localStorage.getItem("adminCurrency") || "USD"
    setCurrency(savedCurrency)
  }, [])

  const loadDashboardData = () => {
    const savedProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
    const savedOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]")
    const savedSiteImages = JSON.parse(localStorage.getItem("siteImages") || "{}")

    setProducts(savedProducts)
    setRecentOrders(savedOrders)
    setSiteImages(savedSiteImages)
    setStats({
      totalProducts: savedProducts.length,
      totalOrders: savedOrders.length,
      totalCustomers: savedOrders.length > 0 ? new Set(savedOrders.map((o: any) => o.customer)).size : 0,
      totalRevenue: savedOrders.reduce((sum: number, order: any) => sum + order.total, 0),
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProduct({ ...newProduct, image: file })
    }
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in all required fields")
      return
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      status: "active",
      description: newProduct.description,
      category: newProduct.category,
      brand: newProduct.brand || "TTTSL",
      sku: newProduct.sku || `SKU-${Date.now()}`,
      specifications: newProduct.specifications,
      image: newProduct.image ? URL.createObjectURL(newProduct.image) : null,
    }

    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))

    // Update stats
    setStats((prev) => ({
      ...prev,
      totalProducts: updatedProducts.length,
    }))

    // Reset form
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      description: "",
      category: "",
      sku: "",
      specifications: {},
      image: null,
      brand: "TTTSL",
    })
    setShowAddProduct(false)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      category: product.category || "",
      sku: product.sku || "",
      specifications: product.specifications || {},
      image: null,
      brand: product.brand || "TTTSL",
    })
  }

  const handleSaveEdit = () => {
    if (!editingProduct || !newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in all required fields")
      return
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      description: newProduct.description,
      category: newProduct.category,
      brand: newProduct.brand || editingProduct.brand,
      sku: newProduct.sku,
      specifications: newProduct.specifications,
      image: newProduct.image ? URL.createObjectURL(newProduct.image) : editingProduct.image,
    }

    const updatedProducts = products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
    setProducts(updatedProducts)
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))

    // Reset form
    setEditingProduct(null)
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      description: "",
      category: "",
      sku: "",
      specifications: {},
      image: null,
      brand: "TTTSL",
    })
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== productId)
      setProducts(updatedProducts)
      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))

      setStats((prev) => ({
        ...prev,
        totalProducts: updatedProducts.length,
      }))
    }
  }

  const handleAddSpecification = () => {
    if (specKey && specValue) {
      setNewProduct({
        ...newProduct,
        specifications: {
          ...newProduct.specifications,
          [specKey]: specValue,
        },
      })
      setSpecKey("")
      setSpecValue("")
    }
  }

  const handleRemoveSpecification = (key: string) => {
    const newSpecs = { ...newProduct.specifications }
    delete newSpecs[key]
    setNewProduct({ ...newProduct, specifications: newSpecs })
  }

  const handleSiteImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setSiteImages((prev) => ({ ...prev, [key]: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSaveSiteImages = () => {
    localStorage.setItem("siteImages", JSON.stringify(siteImages))
    alert("Site images saved. Refresh pages to see updates where applicable.")
  }

  const handleResetSiteImage = (key: string) => {
    const copy = { ...siteImages }
    delete copy[key]
    setSiteImages(copy)
    localStorage.setItem("siteImages", JSON.stringify(copy))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "low-stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const currencySymbols: { [k: string]: string } = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
  }

  const formatAmount = (amount: number) => {
    const symbol = currencySymbols[currency] || "$"
    // Use toLocaleString for thousands separators; keep simple symbol prefix
    return `${symbol}${Number(amount || 0).toLocaleString()}`
  }

  const handleCurrencyChange = (value: string) => {
    setCurrency(value)
    localStorage.setItem("adminCurrency", value)
  }

  return (
   <AdminAuthGuard>
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Admin</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                View Store
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalProducts === 0 ? "No products yet" : "Active products"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalOrders === 0 ? "No orders yet" : "Total orders"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCustomers === 0 ? "No customers yet" : "Unique customers"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-28">
                    <SelectValue>{currency}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="NGN">NGN (₦)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatAmount(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalRevenue === 0 ? "No revenue yet" : "Total revenue"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="site-images">Site Images</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No orders yet. Orders will appear here when customers make purchases.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order: any) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <div className="text-right">
                            <p className="font-medium">{formatAmount(order.total)}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </div>
                <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                {(showAddProduct || editingProduct) && (
                  <div className="mb-6 p-6 border border-border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowAddProduct(false)
                          setEditingProduct(null)
                          setNewProduct({
                            name: "",
                            price: "",
                            stock: "",
                            description: "",
                            category: "",
                            sku: "",
                            specifications: {},
                            image: null,
                            brand: "TTTSL",
                          })
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="productName">Product Name *</Label>
                        <Input
                          id="productName"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="Enter product name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productPrice">{`Price (${currencySymbols[currency] || "$"}) *`}</Label>
                        <Input
                          id="productPrice"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productStock">Stock Quantity *</Label>
                        <Input
                          id="productStock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productSku">SKU</Label>
                        <Input
                          id="productSku"
                          value={newProduct.sku}
                          onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                          placeholder="Auto-generated if empty"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productCategory">Category</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="women">Women</SelectItem>
                            <SelectItem value="men">Men</SelectItem>
                            <SelectItem value="unisex">Unisex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="productBrand">Brand</Label>
                        <Select
                          value={newProduct.brand}
                          onValueChange={(value) => setNewProduct({ ...newProduct, brand: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TTTSL">TTTSL</SelectItem>
                            <SelectItem value="Swanky by Ellery">Swanky by Ellery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="productImage">Product Image</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="productImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                          <Upload className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="productDescription">Description</Label>
                      <Textarea
                        id="productDescription"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Enter product description"
                        rows={3}
                      />
                    </div>

                    {/* Specifications Section */}
                    <div className="mb-4">
                      <Label>Specifications</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Specification name (e.g., Material)"
                          value={specKey}
                          onChange={(e) => setSpecKey(e.target.value)}
                        />
                        <Input
                          placeholder="Specification value (e.g., 100% Cotton)"
                          value={specValue}
                          onChange={(e) => setSpecValue(e.target.value)}
                        />
                        <Button type="button" onClick={handleAddSpecification}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {Object.entries(newProduct.specifications).length > 0 && (
                        <div className="space-y-2">
                          {Object.entries(newProduct.specifications).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between p-2 bg-background rounded border"
                            >
                              <span className="text-sm">
                                <strong>{key}:</strong> {value}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSpecification(key)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {editingProduct ? (
                        <Button onClick={handleSaveEdit}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      ) : (
                        <Button onClick={handleAddProduct}>Add Product</Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddProduct(false)
                          setEditingProduct(null)
                          setNewProduct({
                            name: "",
                            price: "",
                            stock: "",
                            description: "",
                            category: "",
                            sku: "",
                            specifications: {},
                            image: null,
                            brand: "TTTSL",
                          })
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No products yet. Add your first product to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product: Product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              SKU: {product.sku} | Stock: {product.stock} units
                            </p>
                            {product.category && (
                              <Badge variant="outline" className="mt-1">
                                {product.category}
                              </Badge>
                            )}
                            {product.brand && (
                              <Badge variant="secondary" className="mt-1 ml-2">
                                {product.brand}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(product.status)}>
                            {product.stock < 10 ? "Low Stock" : "Active"}
                          </Badge>
                          <div className="text-right">
                            <p className="font-medium">{formatAmount(product.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Monthly sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-48 text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                      <p>Sales analytics will appear here when you have orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best selling items this month</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      <p className="text-sm">Add products to see top performers</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.slice(0, 3).map((product: Product, index: number) => (
                        <div key={product.id} className="flex justify-between items-center">
                          <span className="text-sm">{product.name}</span>
                          <span className="text-sm font-medium">0 sold</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="site-images">
            <Card>
              <CardHeader>
                <CardTitle>Site Images</CardTitle>
                <CardDescription>Manage global/site image placeholders (hero, stacks, logo)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Upload images to replace site placeholders. Images are stored in your browser's localStorage for this site.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "stack1", label: "Stack Card 1" },
                    { key: "stack2", label: "Stack Card 2" },
                    { key: "stack3", label: "Stack Card 3" },
                    { key: "hero1", label: "Homepage Hero" },
                    { key: "logo", label: "Site Logo" },
                  ].map((item) => (
                    <div key={item.key} className="p-4 border border-border rounded-md flex items-center gap-4">
                      <div className="w-28 h-20 bg-muted rounded overflow-hidden flex items-center justify-center">
                        <img src={siteImages[item.key] || getSiteImage(item.key)} alt={item.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 font-medium">{item.label}</div>
                        <div className="flex items-center gap-2">
                          <Input type="file" accept="image/*" onChange={(e) => handleSiteImageUpload(item.key, e)} />
                          <Button onClick={() => handleResetSiteImage(item.key)} variant="ghost" size="sm">
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button onClick={handleSaveSiteImages}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Images
                  </Button>
                  <Button variant="outline" onClick={() => { setSiteImages(JSON.parse(localStorage.getItem("siteImages")||"{}")) }}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
   </AdminAuthGuard>
  )
}  