
interface WaitingListProps {
  queueNumbers: string[];
}
const WaitingList: React.FC <WaitingListProps> = ({queueNumbers}): React.ReactElement => {

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
        <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
          Waiting List
        </h2>

        {/* Uncomment to activate feature - Number of Queue List */}
        {/* <span className="ml-auto text-sm text-muted-foreground">
          {queueNumbers.length} in queue
        </span> */}
      </div>

      {/* <div className="grid grid-cols-4 gap-3">
          {queueNumbers} 
      </div> */}

      {/* <div className="grid grid-cols-4 gap-3">
        {queueNumbers.map((number, index) => (
          <div
            key={number}
            className={`
              rounded-xl p-4 text-center transition-all duration-300
              ${
                index === 0
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-primary/10 border border-primary/30"
              }
            `}
          >
            <span
              className={`text-3xl font-semibold ${
                index === 0 ? "text-primary" : "text-foreground"
              }`}
            >
              {number}
            </span>
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-4 gap-3">
        {queueNumbers.map((number, index) => (
          <div
            key={index}
            className={`
              rounded-xl p-4 text-center transition-all duration-300
              ${
                index === 0
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-secondary border border-border"
              }
            `}
          >
            <span
              className={`text-xl font-semibold ${
                index === 0
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {number}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WaitingList;
