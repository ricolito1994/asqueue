import React, { useContext } from 'react'

import { AppContext } from '@context/AppContext'

import { Bell, SquareArrowRightExit } from "lucide-react"
import { Building } from 'lucide-react'

const TopNav: React.FC<any> = (): React.ReactElement => {

  const { user } = useContext(AppContext)

  return (
    <header className="h-13.5 w-full bg-white border-b border-[#dde4ef] flex items-center px-6 gap-3 shrink-0">

      {/* Left — office label */}
      <div className="flex items-center gap-1.5 text-[13px] text-black">
        <Building />
        <span className="font-bold">Registrar Office</span>
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
          <Bell className="w-4 h-4"/>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full border-[1.5px] border-white" aria-hidden="true" />
        </button>

        {/* Divider */}
        <div className="w-px h-4.5 bg-[#dde4ef] mx-1" aria-hidden="true" />

        {/* User chip */}
        <div className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full cursor-pointer hover:bg-[#f0f4fa] transition-colors">
          <div className="w-7.5 h-7.5 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-medium text-white shrink-0">
            GC
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-[#1a2952] leading-tight">{user?.user?.firstname}</p>
            <p className="text-[11px] text-[#5a7099] leading-tight">{user?.user?.designation}</p>
          </div>
          <i className="ti ti-chevron-down text-[12px] text-[#5a7099] ml-0.5" aria-hidden="true" />
        </div>

        {/* Divider */}
        <div className="w-px h-4.5 bg-[#dde4ef] mx-1" aria-hidden="true" />

        {/* Logout */}
        <button className="flex items-center gap-1.5 text-[12px] text-[#5a7099] px-3 py-1.5 rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] hover:text-[#1a2952] transition-colors">
          <SquareArrowRightExit className="w-4 h-4" />
          <span>Logout</span>
        </button>

      </div>
    </header>
  )
}

export default TopNav