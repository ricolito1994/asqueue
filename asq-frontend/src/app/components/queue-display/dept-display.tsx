
import { useEffect, useState } from "react"

interface DeptDisplayProps {
  deptName: string
}

export function DeptDisplay({ deptName }: DeptDisplayProps) {
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
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Department
          </h2>
        </div>

        <div className="flex items-baseline gap-4">
          <span
            className="text-[4rem] font-bold leading-none text-foreground tracking-tight"
            style={{
              textShadow: "0 0 40px oklch(0.72 0.19 160 / 0.15)",
            }}
          >
            {deptName}
          </span>
        </div>

      </div>
    </div>
  )
}
