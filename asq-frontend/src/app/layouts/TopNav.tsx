const TopNav: React.FC<any> = (): React.ReactElement => {
  return (
    <header className="h-[54px] w-full bg-white border-b border-[#dde4ef] flex items-center px-6 gap-3 shrink-0">

      {/* Left — office label */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#5a7099]">
        <i className="ti ti-map-pin text-[14px]" aria-hidden="true" />
        <span>Registrar Office</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right */}
      <div className="flex items-center gap-1">

        {/* Notification bell */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#5a7099] hover:bg-[#f0f4fa] transition-colors"
          aria-label="Notifications"
        >
          <i className="ti ti-bell text-[18px]" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full border-[1.5px] border-white" aria-hidden="true" />
        </button>

        {/* Divider */}
        <div className="w-px h-[18px] bg-[#dde4ef] mx-1" aria-hidden="true" />

        {/* User chip */}
        <div className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full cursor-pointer hover:bg-[#f0f4fa] transition-colors">
          <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-medium text-white shrink-0">
            GC
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-[#1a2952] leading-tight">G. Cruz</p>
            <p className="text-[11px] text-[#5a7099] leading-tight">Registrar · MAR-E Window</p>
          </div>
          <i className="ti ti-chevron-down text-[12px] text-[#5a7099] ml-0.5" aria-hidden="true" />
        </div>

        {/* Divider */}
        <div className="w-px h-[18px] bg-[#dde4ef] mx-1" aria-hidden="true" />

        {/* Logout */}
        <button className="flex items-center gap-1.5 text-[12px] text-[#5a7099] px-3 py-1.5 rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] hover:text-[#1a2952] transition-colors">
          <i className="ti ti-logout text-[15px]" aria-hidden="true" />
          <span>Logout</span>
        </button>

      </div>
    </header>
  )
}

export default TopNav