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

  const generatePages = (
  currentPage: number,
  lastPage: number
): (number | string)[] => {
  if (lastPage <= 5) {
    return Array.from(
      { length: lastPage },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", lastPage];
  }

  if (currentPage >= lastPage - 2) {
    return [
      1,
      "...",
      lastPage - 2,
      lastPage - 1,
      lastPage,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    lastPage,
  ];
};

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

        {generatePages(currentPage, lastPage).map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-[#5a7099]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange?.(Number(page))}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-[12px] font-medium transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-[#dde4ef] hover:bg-[#f0f4fa]"
              }`}
            >
              {page}
            </button>
          )
        )}

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
