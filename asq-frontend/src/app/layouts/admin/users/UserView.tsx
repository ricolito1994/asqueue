import React from "react";
import { X } from "lucide-react";

interface UserViewProps {
  open: boolean;
  onClose: () => void;
  user: any | null;
}

const UserView: React.FC<UserViewProps> = ({
  open,
  onClose,
  user,
}): React.ReactElement | null => {
  if (!open || !user) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close user details"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-black/50"
      />

      {/* Sheet */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">User Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View the user's account information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />

            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Name</p>
            <p className="mt-1 text-sm font-medium">{user.full_name}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Username
            </p>
            <p className="mt-1 text-sm">{user.username}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">Email</p>
            <p className="mt-1 text-sm">{user.email}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Designation
            </p>
            <p className="mt-1 text-sm">{user.designation ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">Title</p>
            <p className="mt-1 text-sm">{user.title ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Department
            </p>
            <p className="mt-1 text-sm">{user.department?.name ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Company ID
            </p>
            <p className="mt-1 text-sm">{user.company_id ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Window ID
            </p>
            <p className="mt-1 text-sm">{user.window_id ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">Created</p>
            <p className="mt-1 text-sm">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border px-4 text-sm font-medium hover:bg-muted"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UserView;
