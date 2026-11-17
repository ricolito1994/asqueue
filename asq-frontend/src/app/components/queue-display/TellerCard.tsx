interface TellerCardProps {
  windowName: string | number;
  currentlyServing: any;
  is_active?: boolean;
}

const TellerCard: React.FC<TellerCardProps> = ({
  windowName,
  currentlyServing,
  is_active,
}): React.ReactElement => {
  return (
    <div className="h-full min-h-0 min-w-0 rounded-xl bg-card border border-border p-2 transition-all duration-300 flex flex-col">
      {/* Queue Number */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <p className="text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-foreground leading-tight">
          {currentlyServing ?? "-"}
        </p>
      </div>

      {/* Window Information */}
      <div className="shrink-0 pt-1 border-t border-border mt-1">
        <p
          className={`text-[10px] mb-1 ${
            is_active ? "bg-primary" : "bg-muted-foreground"
          } uppercase tracking-wide`}
        >
          {is_active ? "serving" : "closed"}
        </p>

        <p className="text-sm font-semibold text-center leading-tight break-words">
          {windowName}
        </p>
      </div>
    </div>
  );
};

export default TellerCard;
