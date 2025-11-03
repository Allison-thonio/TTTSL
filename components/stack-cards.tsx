"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { getSiteImage } from "@/lib/utils"

type Product = {
  id: number
  name: string
  image?: string | null
}

export default function StackCards() {
  const [visible, setVisible] = useState(false)
  const [cards, setCards] = useState<Product[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    try {
      const seen = localStorage.getItem("seenStackCards")
      if (seen === "true") return
      const saved = JSON.parse(localStorage.getItem("adminProducts") || "[]") as Product[]
      const mapped = (saved || []).map((p: any) => ({ id: p.id, name: p.name, image: p.image }))
      if (mapped.length === 0) {
        // fallback placeholders
        setCards([
          { id: 1, name: "New Collection", image: getSiteImage("stack1") },
          { id: 2, name: "Featured", image: getSiteImage("stack2") },
          { id: 3, name: "Best Seller", image: getSiteImage("stack3") },
        ])
      } else {
        setCards(mapped.slice(0, 6))
      }

      setVisible(true)
    } catch (e) {
      // if any error, don't block the home page
      setVisible(false)
    }
  }, [])

  const handleSkip = () => {
    localStorage.setItem("seenStackCards", "true")
    setVisible(false)
  }

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIndex((i) => i + 1)
    } else {
      handleSkip()
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-3xl px-4">
        <button
          aria-label="Skip intro"
          onClick={handleSkip}
          className="absolute right-3 top-3 bg-background/90 rounded-full p-2 shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-[60vh] sm:h-[70vh]">
          {cards.map((card, i) => {
            const offset = i - index
            const visibleCard = Math.abs(offset) <= 3
            const z = 100 - Math.abs(offset)
            const translateY = Math.min(Math.abs(offset) * 14, 80)
            const scale = Math.max(1 - Math.abs(offset) * 0.04, 0.86)
            const opacity = visibleCard ? 1 - Math.abs(offset) * 0.15 : 0

            return (
              <div
                key={card.id}
                style={{
                  zIndex: z,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                }}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-3/4 h-[56vh] sm:h-[64vh] rounded-lg overflow-hidden shadow-2xl transition-all duration-400 bg-background flex flex-col`}
              >
                <img
                  src={card.image || "/placeholder.svg"}
                  alt={card.name}
                  className="w-full h-3/4 object-cover"
                />
                <div className="p-4 bg-background flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{card.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleNext}>Next</Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-center text-sm text-background/80">
          <p>
            Tip: You can skip this intro anytime. Featured items are managed from the Admin Dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
