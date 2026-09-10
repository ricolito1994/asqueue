import React, { useMemo, useState } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface AssignmentDialogProps {
  open: boolean;
  onClose: () => void;
  windowName: string;
  assignedUser: string | null;
  users: User[];
  onAssign: (user: User) => void;
}

const AssignmentDialog: React.FC<AssignmentDialogProps> = ({
  open,
  onClose,
  windowName,
  assignedUser,
  users,
  onAssign,
}): React.ReactElement | null => {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return users;
    }

    return users.filter((user) => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();

      return fullName.includes(searchValue);
    });
  }, [users, search]);

  if (!open) {
    return null;
  }

  const handleClose = () => {
    setSearch("");
    setSelectedUser(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-background shadow-lg">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            {assignedUser ? "Reassign User" : "Assign User"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Select a user for this queue window.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-5 px-6 py-5">
          {/* Window */}
          <div>
            <p className="text-sm font-medium">Window</p>

            <p className="mt-1 text-sm text-muted-foreground">{windowName}</p>
          </div>

          {/* Current Assignment */}
          <div>
            <p className="text-sm font-medium">Current User</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {assignedUser ?? "Unassigned"}
            </p>
          </div>

          {/* User Search */}
          <div className="space-y-2">
            <label htmlFor="user-search" className="text-sm font-medium">
              Select User
            </label>

            <input
              id="user-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users..."
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* User List */}
          <div className="max-h-60 overflow-y-auto rounded-md border">
            {filteredUsers.length > 0 ? (
              <div className="divide-y">
                {filteredUsers.map((user) => {
                  const isSelected = selectedUser?.id === user.id;

                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => setSelectedUser(user)}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
                        isSelected ? "bg-muted font-medium" : ""
                      }`}
                    >
                      <span>
                        {user.firstname} {user.lastname}
                      </span>

                      {isSelected && (
                        <span className="text-primary">Selected</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No users found.
              </div>
            )}
          </div>

          {/* Selected User */}
          {selectedUser && (
            <div className="rounded-md border bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground">Selected User</p>

              <p className="mt-1 text-sm font-medium">
                {selectedUser.firstname} {selectedUser.lastname}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedUser}
            onClick={() => {
              if (selectedUser) {
                onAssign(selectedUser);
              }
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {assignedUser ? "Reassign" : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDialog;
