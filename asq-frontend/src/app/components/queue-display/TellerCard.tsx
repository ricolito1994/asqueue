interface TellerCardProps {
  windowName: number
  currentlyServing: any,
  is_active? : boolean
}

const TellerCard: React.FC <TellerCardProps> = ({windowName, currentlyServing, is_active}): React.ReactElement => {

  // User for Status Configuration - Uncomment when status feature is implemented

  // const statusConfig = {
  //   active: {
  //     color: "bg-primary",
  //     textColor: "text-primary",
  //   },
  //   idle: {
  //     color: "bg-yellow-500",
  //     textColor: "text-yellow-500",
  //   },
  //   closed: {
  //     color: "bg-muted-foreground",
  //     textColor: "text-muted-foreground",
  //   },
  // }

  return (
    <div className="rounded-xl bg-card border border-border p-4 transition-all duration-300 min-h-55 flex flex-col">
  
      <div className="flex-1 flex items-center justify-center">
        <div>
          <p className="text-[72px] font-bold text-foreground leading-none">
            {currentlyServing || "-"}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-border mt-auto">
        <p className={`text-xs mb-2 ${is_active ? "bg-primary" : 'bg-muted-foreground'} uppercase tracking-wide`}>
          {is_active ? 'serving' : 'closed'}
        </p>

        <p className="text-xl font-semibold text-center">
          {windowName}
        </p>
      </div>

    </div>
  )
}

export default TellerCard;

