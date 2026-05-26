const NowServingCard: React.FC<any> = (): React.ReactElement => {
  return (
    <div className="flex flex-col bg-white border border-[#dde4ef] rounded-xl overflow-hidden h-full">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#dde4ef]">
        <i className="ti ti-player-play text-[15px] text-blue-600" aria-hidden="true" />
        <span className="text-[12px] font-medium text-blue-600 uppercase tracking-wider">
          Now Serving
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-6">
        <span className="text-[80px] font-medium text-[#0f2952] leading-none">
          0
        </span>
        <span className="text-[12px] text-[#5a7099] mt-2">
          No active queue
        </span>
      </div>

      {/* Next button */}
      <div className="px-4 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-[13px] font-medium py-3 rounded-lg transition-colors">
          <i className="ti ti-player-skip-forward text-[16px]" aria-hidden="true" />
          Next Queue Number
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-[#f0f4fa] active:scale-[0.98] text-blue-600 text-[13px] font-medium py-3 rounded-lg border border-blue-600 transition-colors">
          <i className="ti ti-repeat text-[16px]" aria-hidden="true" />
          Recall Number
        </button>
      </div>
      

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 mt-3 border-t border-[#dde4ef]">
        <div>
          <span className="block text-[20px] font-medium text-[#0f2952]">
            13:44:53
          </span>
          <span className="block text-[11px] text-[#5a7099]">
            26/05/2026
          </span>
        </div>
        <i className="ti ti-clock text-[20px] text-[#c8d6ee]" aria-hidden="true" />
      </div>

    </div>
  )
}

export default NowServingCard