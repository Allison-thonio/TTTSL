import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Return a site image URL for a given key. On the client this will
 * check localStorage for any admin-provided image and fall back to the
 * placeholder SVG with the same key.
 */
export function getSiteImage(key: string) {
  try {
    if (typeof window !== "undefined") {
      const store = JSON.parse(localStorage.getItem("siteImages") || "{}")
      if (store && store[key]) return store[key]
    }
  } catch (e) {
    // ignore parse errors
  }
  return `/placeholder.svg?key=${encodeURIComponent(key)}`
}
