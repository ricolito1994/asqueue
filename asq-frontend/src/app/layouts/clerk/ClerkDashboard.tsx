import NowServingCard from './NowServingCard'
import QueueListCard from './QueueListCard'

import ActivateClerkWarn from '@components/commons/ActivateClerkWarn'

const ClerkDashboard: React.FC<any> = (): React.ReactElement => {
 
  return (
    <div className="flex flex-col gap-4 h-full">
      < ActivateClerkWarn />
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