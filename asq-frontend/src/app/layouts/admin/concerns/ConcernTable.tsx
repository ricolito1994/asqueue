import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import AsDataTable from "@components/commons/AsDataTable";
import { PaginationMeta } from "@components/commons/AsDataTable/types";

import ConcernActions from "./ConcernActions";

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

interface ConcernTableProps {
  concerns: Concern[];
  loading?: boolean;
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onView?: (concern: Concern) => void;
}

const ConcernTable: React.FC<ConcernTableProps> = ({
  concerns,
  loading = false,
  paginationMeta,
  onPageChange,
  onView,
}) => {
  const columns: ColumnDef<Concern>[] = [
    {
      accessorKey: "name",
      header: "Concern",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => <span>{row.original.department?.name ?? "-"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.description || "-"}
        </span>
      ),
    },
    {
      id: "windows",
      header: "Assigned Windows",
      cell: ({ row }) => <span>{row.original.windows.length}</span>,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      enableSorting: false,
      cell: ({ row }) => (
        <ConcernActions
          concern={row.original}
          onView={(concern) => onView?.(concern)}
        />
      ),
    },
  ];

  return (
    <AsDataTable
      columns={columns}
      data={concerns}
      pagination={true}
      paginationMeta={paginationMeta}
      onPageChange={onPageChange}
      loading={loading}
    />
  );
};

export default ConcernTable;
