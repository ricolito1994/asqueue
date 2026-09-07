import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import AsDataTable from "@components/commons/AsDataTable";
import { PaginationMeta } from "@components/commons/AsDataTable/types";

import DepartmentActions from "./DepartmentActions";

interface Department {
  id: number;
  name: string;
  company_id: number;
  logo: string | null;
  created_at: string;
  updated_at: string;
}

interface DepartmentTableProps {
  departments: Department[];
  loading?: boolean;
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onEdit?: (department: Department) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
  departments,
  loading = false,
  paginationMeta,
  onPageChange,
  onEdit,
}) => {
  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "name",
      header: "Department",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);

        return (
          <span className="text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      enableSorting: false,
      cell: ({ row }) => (
        <DepartmentActions
          department={row.original}
          onEdit={(department) => onEdit?.(department)}
        />
      ),
    },
  ];

  return (
    <AsDataTable
      columns={columns}
      data={departments}
      pagination={true}
      paginationMeta={paginationMeta}
      onPageChange={onPageChange}
      loading={loading}
    />
  );
};

export default DepartmentTable;
