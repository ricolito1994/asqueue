import NowServingCard from './NowServingCard'
import QueueListCard from './QueueListCard'

const ClerkDashboard: React.FC<any> = (): React.ReactElement => {
  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Alert banner */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#fefbe8] border border-[#e8d96a] rounded-lg text-[12.5px] text-[#7a6400]">
        <i className="ti ti-alert-triangle text-[16px] text-[#c9a800] shrink-0" aria-hidden="true" />
        <span>
          <strong>Warning:</strong> You are logged in but not an active clerk yet. Kindly press the button to activate.
        </span>
        <button className="ml-auto bg-blue-600 text-white text-[11.5px] font-medium px-3.5 py-1.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0">
          Activate
        </button>
      </div>

      {/* Page title */}
      <h1 className="text-[16px] font-medium text-[#0f2952]">
        Queueing Dashboard
      </h1>

      {/* Content grid */}
      <div className="grid grid-cols-[1fr_1.6fr] gap-3.5 flex-1 min-h-0">
        <NowServingCard />
        <QueueListCard />
      </div>

    </div>
  )
}

export default ClerkDashboard