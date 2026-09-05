import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminDashboardLayout: React.FC<any> = (): React.ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarOpen((current: boolean) => !current);
  };

  const openMobileSidebar = (): void => {
    setMobileSidebarOpen(true);
  };

  const closeMobileSidebar = (): void => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar open={sidebarOpen} onToggle={toggleSidebar} />
        </div>

        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div className="lg:hidden">
            {/* Overlay */}
            <button
              type="button"
              aria-label="Close navigation"
              onClick={closeMobileSidebar}
              className="fixed inset-0 z-40 cursor-default bg-black/50"
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 z-50">
              <AdminSidebar
                open={true}
                mobile={true}
                onClose={closeMobileSidebar}
              />
            </div>
          </div>
        )}

        {/* Main Application */}
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            onSidebarToggle={toggleSidebar}
            onMobileMenuToggle={openMobileSidebar}
          />

          <main className="min-w-0 flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-400 px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
