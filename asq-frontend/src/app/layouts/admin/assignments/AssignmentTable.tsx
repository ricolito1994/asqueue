import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowLeftRight } from "lucide-react";

import AsDataTable from "@components/commons/AsDataTable";
import { PaginationMeta } from "@components/commons/AsDataTable/types";

interface Assignment {
  id: number;
  department: string;
  window: string;
  assignedUser: string | null;
}

interface AssignmentTableProps {
  assignments: Assignment[];
  loading?: boolean;
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onAssign?: (assignment: Assignment) => void;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({
  assignments,
  loading = false,
  paginationMeta,
  onPageChange,
  onAssign,
}): React.ReactElement => {
  const columns: ColumnDef<Assignment>[] = [
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.department}</span>
      ),
    },

    {
      accessorKey: "window",
      header: "Window",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.window}</span>
      ),
    },

    {
      accessorKey: "assignedUser",
      header: "Assigned User",
      cell: ({ row }) => (
        <span
          className={
            row.original.assignedUser
              ? "text-foreground"
              : "text-muted-foreground"
          }
        >
          {row.original.assignedUser ?? "Unassigned"}
        </span>
      ),
    },

    {
      id: "actions",
      header: "Action",
      enableSorting: false,
      cell: ({ row }) => {
        const isAssigned = Boolean(row.original.assignedUser);

        return (
          <button
            type="button"
            onClick={() => onAssign?.(row.original)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeftRight className="size-4" />

            <span>{isAssigned ? "Change" : "Assign"}</span>
          </button>
        );
      },
    },
  ];

  return (
    <AsDataTable
      columns={columns}
      data={assignments}
      pagination={true}
      paginationMeta={paginationMeta}
      onPageChange={onPageChange}
      loading={loading}
    />
  );
};

export default AssignmentTable;
