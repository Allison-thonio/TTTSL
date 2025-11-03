"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AdminAuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AdminAuthGuard({ children, redirectTo = "/auth/login" }: AdminAuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("adminAuth")
      if (!adminAuth) {
        router.push(redirectTo)
        return
      }

      try {
        const admin = JSON.parse(adminAuth)
        // Validate role and expiry (if present)
        const now = Date.now()
        const expiresAt = admin?.expiresAt ? Number(admin.expiresAt) : null
        const notExpired = !expiresAt || expiresAt > now

        const isValid = admin && admin.role === "admin" && notExpired

        if (!isValid) {
          // If expired, remove stale auth
          localStorage.removeItem("adminAuth")
          router.push(redirectTo)
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("adminAuth")
        router.push(redirectTo)
      }
    }

    checkAuth()
  }, [redirectTo, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}