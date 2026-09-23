import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "@context/AppContext";

import AuthenticationService from "@services/AuthenticationService";
import { QueueManagerService } from "@services/QueueManagerService";

import ConcernTable from "./ConcernTable";
import ConcernView from "./ConcernView";

interface Concern {
  id: number;
  name: string;
  description: string | null;
  company_id: number;
  department_id: number;
  department?: {
    id: number;
    name: string;
  };
  logo: string | null;
  created_at: string;
  updated_at: string;
  windows: {
    id: number;
    name: string;
  }[];
}

interface Department {
  id: number;
  name: string;
}

interface PaginationMeta {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

const ConcernPage: React.FC = (): React.ReactElement => {
  const { user, setUser } = useContext(AppContext);

  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);
  const [viewOpen, setViewOpen] = useState<boolean>(false);

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

  const queue = useRef(
    new QueueManagerService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
      onRefreshToken,
    ),
  );

  const fetchConcerns = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await queue.current.adminConcerns(page);

      const departmentResponse = await auth.current.departmentAll();

      const concernsWithDepartments = response.data.map((concern: Concern) => {
        const department = departmentResponse.find(
          (department: Department) => department.id === concern.department_id,
        );

        return {
          ...concern,
          department,
        };
      });

      setConcerns(concernsWithDepartments);

      setPaginationMeta({
        currentPage: response.current_page,
        perPage: response.per_page,
        total: response.total,
        lastPage: response.last_page,
      });
    } catch (error) {
      console.error("Failed to fetch concerns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerns(1);
  }, []);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Concerns</h1>

        <p className="text-sm text-muted-foreground">
          Manage concerns and their assigned windows.
        </p>
      </div>

      {/* Table */}
      <ConcernTable
        concerns={concerns}
        loading={loading}
        paginationMeta={paginationMeta}
        onPageChange={fetchConcerns}
        onView={(concern) => {
          setSelectedConcern(concern);
          setViewOpen(true);
        }}
      />
      
      <ConcernView
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedConcern(null);
        }}
        concern={selectedConcern}
      />
    </div>
  );
};

export default ConcernPage;
