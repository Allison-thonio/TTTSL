"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface CustomerAuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function CustomerAuthGuard({ children, redirectTo = "/auth/login" }: CustomerAuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const customerAuth = localStorage.getItem("customerAuth")
      if (customerAuth) {
        setIsAuthenticated(true)
      } else {
        router.push(redirectTo)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
