import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import AsDataTable from "@components/commons/AsDataTable";
import { PaginationMeta } from "@components/commons/AsDataTable/types";

import UserActions from "./UserActions";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  full_name: string;
  username: string;
  email: string;
  designation: string | null;
  title: string | null;
  window_id: number | null;
  company_id: number | null;
  department_id: number | null;
  created_at: string;
}

interface UserTableProps {
  users: User[];
  loading?: boolean;
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  paginationMeta,
  onPageChange,
}) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "full_name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.full_name}</span>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.username}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.designation ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.title ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "window_id",
      header: "Window ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.window_id ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "company_id",
      header: "Company ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.company_id ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "department_id",
      header: "Department ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.department_id ?? "-"}
        </span>
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
      cell: ({ row }) => <UserActions user={row.original} />,
    },
  ];

  return (
    <AsDataTable
      columns={columns}
      data={users}
      pagination={true}
      paginationMeta={paginationMeta}
      onPageChange={onPageChange}
      loading={loading}
    />
  );
};

export default UserTable;
