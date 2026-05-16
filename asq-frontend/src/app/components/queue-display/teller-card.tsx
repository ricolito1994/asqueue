interface TellerCardProps {
  windowName: number
  currentlyServing: any
}

export function TellerCard({ windowName, currentlyServing }: TellerCardProps) {
  const statusConfig = {
    active: {
      color: "bg-primary",
      textColor: "text-primary",
    },
    idle: {
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    closed: {
      color: "bg-muted-foreground",
      textColor: "text-muted-foreground",
    },
  }

  return (
    <div className="rounded-xl bg-card border border-border p-4 transition-all duration-300 h-autofit flex flex-col pb-2">
      <div className="flex items-start justify-between mb-autofit">
        <div>
          {/* <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {windowName}
          </p> */}
          <p className="text-[52px] font-bold text-foreground">{currentlyServing ? currentlyServing : "---"}</p>
        </div>
      </div>

      {/* Always render this section to maintain equal height */}
      <div className="pt-3 border-t border-border mt-auto">
        <p className="text-xs text-muted-foreground mb-6">Currently Serving</p>
        <p className="text-xl font-semibold">
          {windowName}
        </p>
      </div>
    </div>
  )
}
