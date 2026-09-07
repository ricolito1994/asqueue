import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@context/AppContext";
import { Plus } from "lucide-react";

import WindowTable from "./WindowTable";
import WindowForm from "./WindowForm";

import AuthenticationService from "@services/AuthenticationService";

interface Window {
  id: number;
  name: string;
  description: string | null;
  department_id: number;
  department?: {
    id: number;
    name: string;
  };
}

interface Department {
  id: number;
  name: string;
}

interface WindowFormData {
  name: string;
  description: string;
  department_id: number | null;
}

interface PaginationMeta {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

const WindowPage: React.FC = (): React.ReactElement => {
  const { user, setUser } = useContext(AppContext);

  const [windows, setWindows] = useState<Window[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [paginationMeta, setPaginationMeta] = useState<
    PaginationMeta | undefined
  >(undefined);

  const [showWindowForm, setShowWindowForm] = useState<boolean>(false);

  const [selectedWindow, setSelectedWindow] = useState<Window | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onRefreshToken = (data: any) => {
    setUser((prev: any) => ({
      ...prev,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }));
  };

  const auth = useRef(
    new AuthenticationService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
      onRefreshToken,
    ),
  );

  const fetchWindows = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await auth.current.windowIndex(page);

      console.log("WINDOWS API RESPONSE:", response);

      const departmentResponse = await auth.current.departmentAll();

      console.log("DEPARTMENTS API RESPONSE:", departmentResponse);

      const windowsWithDepartments = response.data.map((window: Window) => {
        const department = departmentResponse.find(
          (department: Department) => department.id === window.department_id,
        );

        return {
          ...window,
          department,
        };
      });

      setWindows(windowsWithDepartments);

      setPaginationMeta({
        currentPage: response.current_page,
        perPage: response.per_page,
        total: response.total,
        lastPage: response.last_page,
      });
    } catch (error) {
      console.error("Failed to fetch windows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWindow = () => {
    setSelectedWindow(null);
    setShowWindowForm(true);
  };

  const handleEditWindow = (window: Window) => {
    setSelectedWindow(window);
    setShowWindowForm(true);
  };

  const handleCloseForm = () => {
    setShowWindowForm(false);
    setSelectedWindow(null);
  };

 const handleSaveWindow = async (data: WindowFormData) => {
    try {
      setSuccessMessage(null);

      if (selectedWindow) {
        await auth.current.updateWindow(selectedWindow.id, {
          name: data.name,
          description: data.description,
          department_id: data.department_id,
        });
      } else {
        await auth.current.createWindow({
          name: data.name,
          description: data.description,
          department_id: data.department_id,
        });
      }

      await fetchWindows(1);

      setSuccessMessage(
        selectedWindow
          ? "Window updated successfully."
          : "Window created successfully.",
      );

      setShowWindowForm(false);
      setSelectedWindow(null);
    } catch (error) {
      console.error("Failed to save window:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchWindows(1);
  }, []);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Windows</h1>

          <p className="text-sm text-muted-foreground">
            Manage queue windows across departments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddWindow}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Add Window
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {/* Table */}
      <WindowTable
        windows={windows}
        loading={loading}
        paginationMeta={paginationMeta}
        onPageChange={fetchWindows}
        onEdit={handleEditWindow}
      />

      {/* Window Form */}
      <WindowForm
        open={showWindowForm}
        onClose={handleCloseForm}
        onSubmit={handleSaveWindow}
        window={selectedWindow}
        accessToken={user?.access_token ?? null}
        refreshToken={user?.refresh_token ?? null}
        onRefreshToken={onRefreshToken}
      />
    </div>
  );
};

export default WindowPage;
