import React, { useContext, useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogIn,
  Monitor,
  Settings,
  Users,
  X,
  ShipWheel,
  Building2,
  ArrowLeftRight,
  ClipboardList,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { AppContext } from "@context/AppContext";
import AuthenticationService from "@services/AuthenticationService";

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
      label: "Departments",
      href: "/asqueue/admin/departments",
      icon: Building2,
    },
    {
      label: "Windows",
      href: "/asqueue/admin/windows",
      icon: Monitor,
    },
    {
      label: "Concerns",
      href: "/asqueue/admin/concerns",
      icon: ClipboardList,
    },
  ];

  const AdminSidebar: React.FC<any> = ({
    open,
    mobile = false,
    onToggle,
    onClose,
  }): React.ReactElement => {
    const { user, setUser } = useContext(AppContext);

    const location = useLocation();

    const handleLogout = async (): Promise<void> => {
      try {
        const auth = new AuthenticationService(
          user?.access_token ?? null,
          null,
          user?.refresh_token,
        );

        await auth.logout({});
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
      }
  };

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

  useEffect(() => {
    if (!mobile) {
      window.localStorage.setItem(STORAGE_KEY, String(width));
    }
  }, [width, mobile]);

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

  const resetWidth = (): void => {
    setWidth(DEFAULT_WIDTH);
  };

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
        "relative flex h-screen shrink-0 flex-col bg-[#0f2952]",
        !isResizing && "transition-[width] duration-200 ease-in-out",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-white/8 px-4.5">
        <Link
          to="/asqueue/admin"
          onClick={mobile ? onClose : undefined}
          className={[
            "flex min-w-0 items-center",
            open ? "gap-2.5" : "justify-center",
          ].join(" ")}
        >
          {/* Application Logo */}
          <div className="flex size-8.5 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <ShipWheel className="size-5" />
          </div>

          {/* Application Name */}
          {open && (
            <div className="min-w-0">
              <span className="block truncate text-md font-bold text-white">
                JBLFMU
              </span>

              <span className="mt-0.5 block truncate text-[10px] uppercase tracking-widest text-white/40">
                Queue System
              </span>
            </div>
          )}
        </Link>

        {/* Mobile Close */}
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex size-8 shrink-0 items-center justify-center rounded-md text-white/50 hover:bg-white/6 hover:text-white"
          >
            <X className="size-4" />

            <span className="sr-only">Close sidebar</span>
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2">
        {/* Main */}
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

        {/* Management */}
        <SidebarSection label="Management" open={open} className="mt-5">
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

        {/* Assignments */}
        <SidebarSection label="Assignments" open={open} className="mt-5">
          <SidebarItem
            item={{
              label: "Assignments",
              href: "/asqueue/admin/assignments",
              icon: ArrowLeftRight,
            }}
            active={isActive("/asqueue/admin/assignments")}
            open={open}
            onClick={mobile ? onClose : undefined}
          />
        </SidebarSection>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/8 px-4.5 py-3.5">
        <SidebarItem
          item={{
            label: "Settings",
            href: "/asqueue/admin/settings",
            icon: Settings,
          }}
          active={isActive("/asqueue/admin/settings")}
          open={open}
          onClick={mobile ? onClose : undefined}
        />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          title={!open ? "Logout" : undefined}
          className={[
            "mt-1 flex h-9 w-full items-center rounded-md text-sm font-medium text-white/50 transition-colors hover:bg-white/6 hover:text-white/80",
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
          className="absolute -right-3 top-17 z-20 flex size-6 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
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
            "hover:bg-white/10",
            "focus-visible:bg-ring",
            isResizing && "bg-white/10",
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
        <h2 className="px-4.5 pt-4 pb-1.5 text-[10px] uppercase tracking-widest text-white/30">
          {label}
        </h2>
      )}

      <nav>{children}</nav>
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
        "relative mx-2 flex h-9 items-center rounded-lg text-sm transition-colors duration-150",
        open ? "gap-2.5 px-3" : "justify-center px-2",
        active
          ? "bg-blue-500/20 text-blue-300"
          : "text-white/50 hover:bg-white/6 hover:text-white/80",
      ].join(" ")}
    >
      {active && (
        <span className="absolute -left-2 top-1/2 h-[55%] w-0.75 -translate-y-1/2 rounded-r-sm bg-blue-500" />
      )}

      <Icon className="size-4.25 shrink-0" aria-hidden="true" />

      {open && <span className="flex-1 truncate">{item.label}</span>}
    </Link>
  );
};

export default AdminSidebar;
