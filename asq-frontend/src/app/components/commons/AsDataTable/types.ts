import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableMode = "client" | "server";

export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

export interface AsDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];

  mode?: DataTableMode;

  searchable?: boolean;
  pagination?: boolean;
  selectable?: boolean;

  paginationMeta?: PaginationMeta;

  loading?: boolean;

  searchColumn?: string;

  page?: number;
  pageSize?: number;
  totalRows?: number;

  onPageChange?: (page: number) => void;
  onSearch?: (value: string) => void;

  renderActions?: (row: TData) => ReactNode;
}
