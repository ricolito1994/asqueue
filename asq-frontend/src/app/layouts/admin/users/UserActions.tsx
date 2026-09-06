import React, { useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
  onView: (user: any) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEdit,
  onView,
}): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((current: boolean) => !current)}
        className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
      >
        <MoreHorizontal className="size-4" />

        <span className="sr-only">Open actions for {user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-md border bg-background p-1 shadow-md">
          <button
            type="button"
            onClick={() => onView(user)}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            <Eye className="size-4" />
            View
          </button>

          <button
            type="button"
            onClick={() => onEdit(user)}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            <Edit className="size-4" />
            Edit
          </button>

          <div className="my-1 h-px bg-border" />

          <button
            type="button"
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

export default UserActions;
