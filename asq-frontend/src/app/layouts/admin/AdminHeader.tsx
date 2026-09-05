import React, { useContext } from "react";

import { AppContext } from "@context/AppContext";
import AuthenticationService from "@services/AuthenticationService";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { Bell, LogOut, Menu, Moon, Sun, UserCircle } from "lucide-react";

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
  const { user, setUser } = useContext(AppContext);

  const handleLogout = async () => {
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

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b bg-background">
      <div className="flex w-full items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          {/* Desktop Sidebar Toggle */}
          <button
            type="button"
            onClick={onSidebarToggle}
            className="hidden size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:inline-flex"
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
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            title="Open navigation"
          >
            <Menu className="size-4" />

            <span className="sr-only">Open navigation</span>
          </button>

          <div className="hidden h-5 w-px bg-border sm:block" />

          <div className="text-sm font-medium">Admin</div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <button
            type="button"
            className="relative inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Notifications"
          >
            <Bell className="size-4" />

            <span className="sr-only">Notifications</span>

            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Toggle theme"
          >
            <Sun className="size-4 dark:hidden" />

            <Moon className="hidden size-4 dark:block" />

            <span className="sr-only">Toggle theme</span>
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="ml-1 flex h-9 items-center gap-2 rounded-md px-2 text-sm font-medium hover:bg-muted"
              >
                <UserCircle className="size-5" />

                <span className="hidden md:inline">Administrator</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
