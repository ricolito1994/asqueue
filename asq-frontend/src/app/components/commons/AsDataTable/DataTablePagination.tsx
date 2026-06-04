import { PaginationMeta } from "./types";

import { ChevronRight, ChevronLeft } from "lucide-react";

interface DataTablePaginationProps {
  paginationMeta: PaginationMeta;
  onPageChange?: (page: number) => void;
}

export default function DataTablePagination({
  paginationMeta,
  onPageChange,
}: DataTablePaginationProps) {
  const { currentPage, lastPage, total } = paginationMeta;

  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-[12px] text-[#5a7099]">{total} total items</span>

      <div className="flex items-center gap-1.5">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="w-6.5 h-6.5 flex items-center justify-center rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] transition-colors disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        <button className="w-6.5 h-6.5 flex items-center justify-center rounded-lg bg-blue-600 text-white text-[12px] font-medium">
          {currentPage}
        </button>

        <button
          disabled={currentPage >= lastPage}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="w-6.5 h-6.5 flex items-center justify-center rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] transition-colors disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
