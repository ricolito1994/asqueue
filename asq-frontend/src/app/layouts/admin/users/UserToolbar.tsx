import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const UserToolbar: React.FC<any> = (): React.ReactElement => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search users..."
          className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Filters */}
      <button
        type="button"
        className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        <SlidersHorizontal className="size-4" />
        Filters
      </button>
    </div>
  );
};

export default UserToolbar;
