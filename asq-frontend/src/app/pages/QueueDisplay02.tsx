import {
  DeptDisplay,
  WaitingList,
  TellerCard,
  MediaPanel,
} from "@components/queue-display"


// Sample data - replace with real-time data in production
const sampleData = {
  nowServing: {
    queueNumber: "A042",
    windowLabel: "Window 3",
  },
  waitingList: ["A043", "A044", "A045", "A046", "A047", "A048", "A049", "A050"],
  tellers: [
    { windowNumber: 1, currentQueue: "A039", status: "active" as const },
    { windowNumber: 2, currentQueue: "A041", status: "active" as const },
    { windowNumber: 3, currentQueue: "A042", status: "active" as const },
    { windowNumber: 4, currentQueue: "", status: "idle" as const },
    { windowNumber: 5, currentQueue: "", status: "closed" as const },
    { windowNumber: 6, currentQueue: "A040", status: "active" as const },
  ],
}

export default function QueueDisplay() {
  return (
    <div className="h-screen w-screen p-6 overflow-hidden relative">

      {/* Main container with 16:9 aspect ratio maintained */}
      <div className="h-full w-full max-w-[1920px] max-h-[1080px] mx-auto">
        <div className="h-full grid grid-cols-[60%_40%] gap-6">
          {/* Left Column - Queue Information */}
          <div className="flex flex-col gap-6 min-h-0">
            {/* Now Serving - Large display */}
            <DeptDisplay
              queueNumber={sampleData.nowServing.queueNumber}
              windowLabel={sampleData.nowServing.windowLabel}
            />

            {/* Waiting List */}
            <WaitingList queueNumbers={sampleData.waitingList} />

            {/* Teller/Window Cards */}
            <div className="flex-1 min-h-0">
              <div className="rounded-2xl bg-card border border-border p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
                    Service Windows
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-1 auto-rows-fr">
                  {sampleData.tellers.map((teller) => (
                    <TellerCard
                      key={teller.windowNumber}
                      windowNumber={teller.windowNumber}
                      currentQueue={teller.currentQueue}
                      status={teller.status}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Media/Advertisements */}
          <MediaPanel />
        </div>
      </div>
    </div>
  )
}
