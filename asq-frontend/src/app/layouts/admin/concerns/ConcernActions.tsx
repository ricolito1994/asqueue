import React, { useEffect, useRef, useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

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

interface ConcernActionsProps {
  concern: Concern;
  onView?: (concern: Concern) => void;
  onEdit?: (concern: Concern) => void;
}

const ConcernActions: React.FC<ConcernActionsProps> = ({ 
    concern, 
    onView, 
    onEdit,
}) => {

  const [open, setOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const handleView = () => {
    setOpen(false);
    onView?.(concern);
    };

  const handleEdit = () => {
    setOpen(false);
    onEdit?.(concern);
  };

  const handleDelete = () => {
    setOpen(false);
    console.log("Delete concern:", concern);
  };

  return (
    <div ref={actionsRef} className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-50 w-36 rounded-md border bg-background py-1 shadow-md">
          <button
            type="button"
            onClick={handleView}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ConcernActions;
