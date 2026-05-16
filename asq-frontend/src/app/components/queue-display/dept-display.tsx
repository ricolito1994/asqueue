
import { useEffect, useState } from "react"

interface DeptDisplayProps {
  queueNumber: string
  windowLabel: string
}

export function DeptDisplay({ queueNumber, windowLabel }: DeptDisplayProps) {
  const [isGlowing, setIsGlowing] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing((prev) => !prev)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-2xl bg-card border border-border p-6 overflow-hidden">
      {/* Animated glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 ${
          isGlowing ? "opacity-100" : "opacity-50"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.19 160 / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
            Now Serving
          </h2>
        </div>

        <div className="flex items-baseline gap-4">
          <span
            className="text-[8rem] font-bold leading-none text-foreground tracking-tight"
            style={{
              textShadow: "0 0 40px oklch(0.72 0.19 160 / 0.3)",
            }}
          >
            {queueNumber}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xl font-medium text-primary">{windowLabel}</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </div>
  )
}
