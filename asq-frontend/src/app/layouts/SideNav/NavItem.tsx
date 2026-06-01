import { NavLink } from 'react-router-dom'
import { LucideIcon } from "lucide-react"

interface NavItemProps {
  icon: LucideIcon
  label: string
  to: string
  badge?: number
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  to,
  badge
}: NavItemProps): React.ReactElement => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-2.5 px-3 py-2.5 mx-2 rounded-lg text-sm transition-colors duration-150
        ${isActive
          ? 'bg-blue-500/20 text-blue-300'
          : 'text-white/50 hover:bg-white/6 hover:text-white/80'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-0.75 h-[55%] bg-blue-500 rounded-r-sm" />
          )}

          <Icon
            className="w-4.25 h-4.25 shrink-0"
            aria-hidden="true"
          />

          <span className="flex-1">
            {label}
          </span>

          {badge && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/25 text-blue-300">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavItem