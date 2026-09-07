import React, { useEffect, useRef, useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

interface DepartmentActionsProps {
  department: any;
  onEdit: (department: any) => void;
  onView?: (department: any) => void;
}

const DepartmentActions: React.FC<DepartmentActionsProps> = ({
  department,
  onEdit,
  onView,
}): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
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

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleView = () => {
    setOpen(false);
    onView?.(department);
  };

  const handleEdit = () => {
    setOpen(false);
    onEdit(department);
  };

  const handleDelete = () => {
    setOpen(false);
  };

  return (
    <div ref={actionsRef} className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
      >
        <MoreHorizontal className="size-4" />

        <span className="sr-only">Open actions for {department.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-md border bg-background p-1 shadow-md">
          <button
            type="button"
            onClick={handleView}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            <Eye className="size-4" />
            View
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            <Edit className="size-4" />
            Edit
          </button>

          <div className="my-1 h-px bg-border" />

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DepartmentActions;
