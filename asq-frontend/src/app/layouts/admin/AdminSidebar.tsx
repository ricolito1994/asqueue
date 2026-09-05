import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogIn,
  Monitor,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}

interface AdminSidebarProps {
  open: boolean;
  mobile?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

const MIN_WIDTH: number = 220;
const DEFAULT_WIDTH: number = 260;
const MAX_WIDTH: number = 400;
const COLLAPSED_WIDTH: number = 64;

const STORAGE_KEY: string = "admin-sidebar-width";

const mainNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/asqueue/admin",
    icon: LayoutDashboard,
  },
];

const managementNavigation: NavigationItem[] = [
  {
    label: "Users",
    href: "/asqueue/admin/users",
    icon: Users,
  },
  {
    label: "Windows",
    href: "/asqueue/admin/windows",
    icon: Monitor,
  },
];

const AdminSidebar: React.FC<any> = ({
  open,
  mobile = false,
  onToggle,
  onClose,
}): React.ReactElement => {
  const location = useLocation();

  const [width, setWidth] = useState<number>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_WIDTH;
    }

    const savedWidth: string | null = window.localStorage.getItem(STORAGE_KEY);

    if (!savedWidth) {
      return DEFAULT_WIDTH;
    }

    const parsedWidth: number = Number(savedWidth);

    if (!Number.isFinite(parsedWidth)) {
      return DEFAULT_WIDTH;
    }

    return Math.min(Math.max(parsedWidth, MIN_WIDTH), MAX_WIDTH);
  });

  const [isResizing, setIsResizing] = useState<boolean>(false);

  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(width);

  /*
   * Save sidebar width.
   */
  useEffect(() => {
    if (!mobile) {
      window.localStorage.setItem(STORAGE_KEY, String(width));
    }
  }, [width, mobile]);

  /*
   * Handle sidebar resizing.
   */
  useEffect(() => {
    if (!isResizing) {
      return;
    }

    const handlePointerMove = (event: PointerEvent): void => {
      const difference: number = event.clientX - resizeStartX.current;

      const newWidth: number = resizeStartWidth.current + difference;

      const clampedWidth: number = Math.min(
        Math.max(newWidth, MIN_WIDTH),
        MAX_WIDTH,
      );

      setWidth(clampedWidth);
    };

    const handlePointerUp = (): void => {
      setIsResizing(false);
    };

    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";

    return (): void => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  /*
   * Start resizing.
   */
  const handleResizeStart = (
    event: React.PointerEvent<HTMLDivElement>,
  ): void => {
    if (mobile || !open) {
      return;
    }

    resizeStartX.current = event.clientX;
    resizeStartWidth.current = width;

    setIsResizing(true);
  };

  /*
   * Reset sidebar width.
   */
  const resetWidth = (): void => {
    setWidth(DEFAULT_WIDTH);
  };

  /*
   * Keyboard resizing.
   */
  const handleResizeKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (mobile || !open) {
      return;
    }

    let newWidth: number = width;

    switch (event.key) {
      case "ArrowLeft":
        newWidth -= 10;
        break;

      case "ArrowRight":
        newWidth += 10;
        break;

      case "Home":
        newWidth = MIN_WIDTH;
        break;

      case "End":
        newWidth = MAX_WIDTH;
        break;

      case "Enter":
        resetWidth();
        return;

      default:
        return;
    }

    event.preventDefault();

    setWidth(Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH));
  };

  /*
   * Determine active navigation item.
   */
  const isActive = (href: string): boolean => {
    if (href === "/asqueue/admin") {
      return location.pathname === href;
    }

    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const sidebarWidth: number = mobile
    ? DEFAULT_WIDTH
    : open
      ? width
      : COLLAPSED_WIDTH;

  return (
    <aside
      className={[
        "relative flex h-screen shrink-0 flex-col border-r bg-background",
        !isResizing && "transition-[width] duration-200 ease-in-out",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      {/* Sidebar Header */}
      <div className="flex h-14 shrink-0 items-center border-b px-3">
        <Link
          to="/asqueue/admin"
          onClick={mobile ? onClose : undefined}
          className={[
            "flex min-w-0 flex-1 items-center rounded-md",
            open ? "gap-2 px-1" : "justify-center",
          ].join(" ")}
        >
          {/* Application Logo */}
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            A
          </div>

          {/* Application Name */}
          {open && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Admin Panel</div>

              <div className="truncate text-xs text-muted-foreground">
                Administrator
              </div>
            </div>
          )}
        </Link>

        {/* Mobile Close */}
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />

            <span className="sr-only">Close sidebar</span>
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        {/* Main Navigation */}
        <SidebarSection label="Main" open={open}>
          {mainNavigation.map((item: NavigationItem) => (
            <SidebarItem
              key={item.href}
              item={item}
              active={isActive(item.href)}
              open={open}
              onClick={mobile ? onClose : undefined}
            />
          ))}
        </SidebarSection>

        {/* Management Navigation */}
        <SidebarSection label="Management" open={open} className="mt-6">
          {managementNavigation.map((item: NavigationItem) => (
            <SidebarItem
              key={item.href}
              item={item}
              active={isActive(item.href)}
              open={open}
              onClick={mobile ? onClose : undefined}
            />
          ))}
        </SidebarSection>
      </div>

      {/* Sidebar Footer */}
      <div className="shrink-0 border-t p-3">
        <SidebarItem
          item={{
            label: "Settings",
            href: "/admin/settings",
            icon: Settings,
          }}
          active={isActive("/admin/settings")}
          open={open}
          onClick={mobile ? onClose : undefined}
        />

        {/* Logout */}
        <button
          type="button"
          title={!open ? "Logout" : undefined}
          className={[
            "mt-1 flex h-9 w-full items-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            open ? "gap-3 px-3" : "justify-center px-2",
          ].join(" ")}
        >
          <LogIn className="size-4 shrink-0" />

          {open && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Button */}
      {!mobile && (
        <button
          type="button"
          onClick={onToggle}
          title={open ? "Collapse sidebar" : "Expand sidebar"}
          className="absolute -right-3 top-[4.25rem] z-20 flex size-6 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
        >
          {open ? (
            <ChevronLeft className="size-3.5" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}

          <span className="sr-only">
            {open ? "Collapse sidebar" : "Expand sidebar"}
          </span>
        </button>
      )}

      {/* Resize Handle */}
      {!mobile && open && (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={MAX_WIDTH}
          aria-valuenow={Math.round(width)}
          aria-label="Resize sidebar"
          tabIndex={0}
          title="Drag to resize. Double-click to reset."
          onPointerDown={handleResizeStart}
          onDoubleClick={resetWidth}
          onKeyDown={handleResizeKeyDown}
          className={[
            "absolute right-0 top-0 z-10 h-full w-1 cursor-col-resize outline-none",
            "hover:bg-border",
            "focus-visible:bg-ring",
            isResizing && "bg-border",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      )}
    </aside>
  );
};

/* -------------------------------------------------------------------------- */
/* Sidebar Section                                                            */
/* -------------------------------------------------------------------------- */

interface SidebarSectionProps {
  label: string;
  open: boolean;
  children: React.ReactNode;
  className?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  open,
  children,
  className,
}): React.ReactElement => {
  return (
    <section className={className}>
      {open && (
        <h2 className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </h2>
      )}

      <nav className="space-y-1">{children}</nav>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Sidebar Item                                                               */
/* -------------------------------------------------------------------------- */

interface SidebarItemProps {
  item: NavigationItem;
  active: boolean;
  open: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  active,
  open,
  onClick,
}): React.ReactElement => {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      onClick={onClick}
      title={!open ? item.label : undefined}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex h-9 items-center rounded-md text-sm font-medium transition-colors",
        open ? "gap-3 px-3" : "justify-center px-2",
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      ].join(" ")}
    >
      <Icon className="size-4 shrink-0" />

      {open && <span className="truncate">{item.label}</span>}
    </Link>
  );
};

export default AdminSidebar;
