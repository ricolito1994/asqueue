interface TellerCardProps {
  windowNumber: number
  currentQueue: string
  status: "active" | "idle" | "closed"
}

export function TellerCard({ windowNumber, currentQueue, status }: TellerCardProps) {
  const statusConfig = {
    active: {
      color: "bg-primary",
      label: "Serving",
      textColor: "text-primary",
    },
    idle: {
      color: "bg-yellow-500",
      label: "Available",
      textColor: "text-yellow-500",
    },
    closed: {
      color: "bg-muted-foreground",
      label: "Closed",
      textColor: "text-muted-foreground",
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={`
        rounded-xl bg-card border border-border p-5 transition-all duration-300
        ${status === "active" ? "ring-1 ring-primary/30" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-4 overflow-hidden">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            Window
          </p>
          <p className="text-3xl font-bold text-foreground">{windowNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.color} ${status === "active" ? "animate-pulse" : ""}`} />
          <span className={`text-sm font-medium ${config.textColor}`}>
            {config.label}
          </span>
        </div>
      </div>

      {status !== "closed" && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">Currently Serving</p>
          <p className={`text-2xl font-semibold ${status === "active" ? "text-foreground" : "text-muted-foreground"}`}>
            {status === "active" ? currentQueue : "---"}
          </p>
        </div>
      )}
    </div>
  )
}
