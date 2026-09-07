import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@context/AppContext";
import { Plus } from "lucide-react";

import DepartmentTable from "./DepartmentTable";
import DepartmentForm from "./DepartmentForm";

import AuthenticationService from "@services/AuthenticationService";

interface Department {
  id: number;
  name: string;
  company_id: number;
  logo: string | null;
  created_at: string;
  updated_at: string;
}

interface PaginationMeta {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

const DepartmentPage: React.FC = (): React.ReactElement => {
  const { user, setUser } = useContext(AppContext);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [paginationMeta, setPaginationMeta] = useState<
    PaginationMeta | undefined
  >(undefined);

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

  const fetchDepartments = async (page: number = 1) => {
     console.log("FETCHING DEPARTMENT PAGE:", page);
    try {
      setLoading(true);

      const response = await auth.current.departmentIndex(page);

      console.log("DEPARTMENTS API RESPONSE:", response);

      setDepartments(response.data);

      setPaginationMeta({
        currentPage: response.current_page,
        perPage: response.per_page,
        total: response.total,
        lastPage: response.last_page,
      });
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showDepartmentForm, setShowDepartmentForm] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleSaveDepartment = async (data: { name: string }) => {
    try {
      if (selectedDepartment) {
        await auth.current.updateDepartment(selectedDepartment.id, data);
      } else {
        await auth.current.createDepartment(data);
      }

      await fetchDepartments(1);

      setShowDepartmentForm(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Failed to save department:", error);

      throw error;
    }
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setShowDepartmentForm(true);
  };

  

  useEffect(() => {
    fetchDepartments(1);
  }, []);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Departments</h1>

          <p className="text-sm text-muted-foreground">
            Manage departments for your organization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedDepartment(null);
            setShowDepartmentForm(true);
          }}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Add Department
        </button>
      </div>

      {/* Table */}
      <DepartmentTable
        departments={departments}
        loading={loading}
        paginationMeta={paginationMeta}
        onPageChange={fetchDepartments}
        onEdit={handleEditDepartment}
      />

      {/* Department Form */}
      <DepartmentForm
        open={showDepartmentForm}
        onClose={() => {
          setShowDepartmentForm(false);
          setSelectedDepartment(null);
        }}
        onSubmit={handleSaveDepartment}
        department={selectedDepartment}
      />
    </div>
  );
};

export default DepartmentPage;
