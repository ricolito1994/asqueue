import React from "react";

import { Bell, Menu, Moon, Sun, UserCircle } from "lucide-react";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onMobileMenuToggle: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  sidebarOpen,
  onSidebarToggle,
  onMobileMenuToggle,
}): React.ReactElement => {
  return (
    <header className="flex h-12 shrink-0 items-center border-b bg-background">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex h-full items-center">
          {/* Desktop Sidebar Toggle */}
          <button
            type="button"
            onClick={onSidebarToggle}
            className="hidden size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:inline-flex"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="size-4" />

            <span className="sr-only">
              {sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            </span>
          </button>

          {/* Mobile Sidebar Toggle */}
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            title="Open navigation"
          >
            <Menu className="size-4" />

            <span className="sr-only">Open navigation</span>
          </button>

          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-border" />

          {/* Page Context */}
          <div className="text-sm font-medium text-foreground">Admin</div>
        </div>

        {/* Right Side */}
        <div className="flex h-full items-center">
          {/* Notifications */}
          <button
            type="button"
            className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Notifications"
          >
            <Bell className="size-4" />

            <span className="sr-only">Notifications</span>

            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-blue-500" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Toggle theme"
          >
            <Sun className="size-4 dark:hidden" />

            <Moon className="hidden size-4 dark:block" />

            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-border" />

          {/* User Info */}
          <div className="flex h-8 items-center gap-2 px-2">
            <UserCircle className="size-5 text-foreground" />

            <div className="hidden text-left md:block">
              <div className="text-xs font-medium leading-tight text-foreground">
                Administrator
              </div>

              <div className="text-[10px] leading-tight text-muted-foreground">
                admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
