const filters = ['All Queue', 'Serving', 'Waiting']

const mockRows = [
  { queue: 3, concern: 'Checking Grades',    status: 'queue'   },
  { queue: 4, concern: 'Checking Grades',    status: 'queue'   },
  { queue: 5, concern: 'Document Request',   status: 'serving' },
  { queue: 2, concern: 'Enrollment Concern', status: 'done'    },
]

const statusStyles: Record<string, string> = {
  queue:   'bg-blue-50 text-blue-800',
  serving: 'bg-green-50 text-green-800',
  done:    'bg-gray-100 text-gray-600',
}

const QueueListCard: React.FC<any> = (): React.ReactElement => {
  return (
    <div className="flex flex-col bg-white border border-[#dde4ef] rounded-xl overflow-hidden h-full">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#dde4ef]">
        <div className="flex items-center gap-2">
          <i className="ti ti-refresh text-[15px] text-blue-600" aria-hidden="true" />
          <span className="text-[12px] font-medium text-blue-600 uppercase tracking-wider">
            Queue List
          </span>
        </div>
        <span className="text-[11px] text-[#5a7099]">Auto-refresh on</span>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#dde4ef]">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`text-[11.5px] px-3 py-1 rounded-full border transition-colors
              ${filter === 'All Queue'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-[#5a7099] border-[#dde4ef] hover:bg-[#f0f4fa]'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 bg-[#f5f8fe]">
            <tr>
              <th className="text-left text-[11px] font-medium text-[#5a7099] uppercase tracking-wider px-4 py-2.5 border-b border-[#dde4ef] w-25">
                Queue No.
              </th>
              <th className="text-left text-[11px] font-medium text-[#5a7099] uppercase tracking-wider px-4 py-2.5 border-b border-[#dde4ef]">
                Concern
              </th>
              <th className="text-left text-[11px] font-medium text-[#5a7099] uppercase tracking-wider px-4 py-2.5 border-b border-[#dde4ef] w-25">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {mockRows.map((row) => (
              <tr
                key={row.queue}
                className="border-b border-[#f0f4fa] hover:bg-[#f8fafd] transition-colors"
              >
                <td className="px-4 py-2.5 text-[13px] font-medium text-[#1a2952]">
                  {row.queue}
                </td>
                <td className="px-4 py-2.5 text-[13px] text-[#1a2952]">
                  {row.concern}
                </td>
                <td className="px-4 py-2.5">
                  <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#dde4ef]">
        <span className="text-[12px] text-[#5a7099]">
          {mockRows.length} out of {mockRows.length} items
        </span>
        <div className="flex items-center gap-1.5">
          <button className="w-6.5 h-6.5 flex items-center justify-center rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] transition-colors" aria-label="Previous page">
            <i className="ti ti-chevron-left text-[13px] text-[#5a7099]" aria-hidden="true" />
          </button>
          <button className="w-6.5 h-6.5 flex items-center justify-center rounded-lg bg-blue-600 text-white text-[12px] font-medium" aria-label="Page 1">
            1
          </button>
          <button className="w-6.5 h-6.5 flex items-center justify-center rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] transition-colors" aria-label="Next page">
            <i className="ti ti-chevron-right text-[13px] text-[#5a7099]" aria-hidden="true" />
          </button>
        </div>
      </div>

    </div>
  )
}

export default QueueListCard