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
    <div className="rounded-xl bg-card border border-border p-4 transition-all duration-300 min-h-[220px] flex flex-col">
  
  <div className="flex-1 flex items-center justify-center">
    <div>
      <p className="text-[72px] font-bold text-foreground leading-none">
        {currentlyServing || "---"}
      </p>
    </div>
  </div>

  <div className="pt-3 border-t border-border mt-auto">
    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
      Currently Serving
    </p>

    <p className="text-xl font-semibold text-center">
      {windowName}
    </p>
  </div>

</div>
  )
}
