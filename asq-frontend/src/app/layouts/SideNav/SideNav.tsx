import NavItem from './NavItem'

const SideNav: React.FC<any> = (): React.ReactElement => {
  return (
    <aside className="w-[210px] min-w-[210px] h-full bg-[#0f2952] flex flex-col">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-[18px] py-4 border-b border-white/[0.08]">
        <div className="w-[34px] h-[34px] bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <i className="ti ti-stack-2 text-white text-[18px]" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-sm font-medium text-white">JBLFMU</span>
          <span className="block text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
            Queue System
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 pt-2">
        <span className="block text-[10px] text-white/30 uppercase tracking-widest px-[18px] pt-4 pb-1.5">
          Main
        </span>
        <NavItem icon="layout-dashboard" label="Dashboard"  to="/clerk/dashboard" />
        <NavItem icon="list-details"     label="Queue Logs" to="/clerk/queue-logs" />

        <span className="block text-[10px] text-white/30 uppercase tracking-widest px-[18px] pt-5 pb-1.5">
          System
        </span>
        <NavItem icon="settings" label="Settings" to="/clerk/settings" />
      </nav>

      {/* Footer */}
      <div className="flex items-center gap-2.5 px-[18px] py-3.5 border-t border-white/[0.08]">
        <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-medium text-white shrink-0">
          GC
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-[12px] font-medium text-white/80 truncate">G. Cruz</p>
          <p className="text-[11px] text-white/35">Administrator</p>
        </div>
        <i className="ti ti-chevron-right text-[13px] text-white/25" aria-hidden="true" />
      </div>

    </aside>
  )
}

export default SideNav