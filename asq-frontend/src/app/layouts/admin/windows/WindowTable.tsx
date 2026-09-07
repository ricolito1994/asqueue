import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import AsDataTable from "@components/commons/AsDataTable";
import { PaginationMeta } from "@components/commons/AsDataTable/types";

import WindowActions from "./WindowActions";

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

interface WindowTableProps {
  windows: Window[];
  loading?: boolean;
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onEdit?: (window: Window) => void;
}

const WindowTable: React.FC<WindowTableProps> = ({
  windows,
  loading = false,
  paginationMeta,
  onPageChange,
  onEdit,
}) => {
  const columns: ColumnDef<Window>[] = [
    {
      accessorKey: "name",
      header: "Window",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.description ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.department?.name ?? "-"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      enableSorting: false,
      cell: ({ row }) => (
        <WindowActions
          window={row.original}
          onEdit={(window) => onEdit?.(window)}
        />
      ),
    },
  ];

  return (
    <AsDataTable
      columns={columns}
      data={windows}
      pagination={true}
      paginationMeta={paginationMeta}
      onPageChange={onPageChange}
      loading={loading}
    />
  );
};

export default WindowTable;
