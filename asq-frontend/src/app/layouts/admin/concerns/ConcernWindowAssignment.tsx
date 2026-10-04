import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "@context/AppContext";

import { QueueManagerService } from "@services/QueueManagerService";

interface Window {
  id: number;
  name: string;
}

interface ConcernWindowAssignmentProps {
  open: boolean;
  onClose: () => void;
  concernName: string;
  assignedWindowIds: number[];
  onSubmit: (windowIds: number[]) => void;
}

const ConcernWindowAssignment: React.FC<ConcernWindowAssignmentProps> = ({
  open,
  onClose,
  concernName,
  assignedWindowIds,
  onSubmit,
}) => {
  const { user, setUser } = useContext(AppContext);

  const [windows, setWindows] = useState<Window[]>([]);
  const [selectedWindowIds, setSelectedWindowIds] =
    useState<number[]>(assignedWindowIds);
  const [loading, setLoading] = useState(false);

  const onRefreshToken = (data: any) => {
    setUser((prev: any) => ({
      ...prev,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }));
  };

  const queue = useRef(
    new QueueManagerService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
      onRefreshToken,
    ),
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedWindowIds(assignedWindowIds);

    const fetchWindows = async () => {
      try {
        setLoading(true);

        const response = await queue.current.windows(1, {});

        setWindows(response?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch windows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWindows();
  }, [open, assignedWindowIds]);

  const toggleWindow = (windowId: number) => {
    setSelectedWindowIds((current) => {
      if (current.includes(windowId)) {
        return current.filter((id) => id !== windowId);
      }

      return [...current, windowId];
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Assign Windows</h2>

          <p className="text-sm text-muted-foreground">
            Assign windows to "{concernName}".
          </p>
        </div>

        <div className="mt-6 max-h-64 overflow-y-auto rounded-md border">
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">
              Loading windows...
            </div>
          ) : windows.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              No windows found.
            </div>
          ) : (
            windows.map((window) => (
              <label
                key={window.id}
                className="flex cursor-pointer items-center gap-3 border-b px-4 py-3 last:border-b-0 hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={selectedWindowIds.includes(window.id)}
                  onChange={() => toggleWindow(window.id)}
                  className="h-4 w-4 rounded border-gray-300"
                />

                <span className="text-sm">{window.name}</span>
              </label>
            ))
          )}
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {selectedWindowIds.length} window
          {selectedWindowIds.length === 1 ? "" : "s"} selected
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSubmit(selectedWindowIds)}
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcernWindowAssignment;
