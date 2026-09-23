import React from "react";
import { X } from "lucide-react";

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
    pivot?: {
      start_date: string | null;
      end_date: string | null;
    };
  }[];
}

interface ConcernViewProps {
  open: boolean;
  onClose: () => void;
  concern: Concern | null;
}

const ConcernView: React.FC<ConcernViewProps> = ({
  open,
  onClose,
  concern,
}) => {
  if (!open || !concern) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close"
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l bg-background shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold">View Concern</h2>

              <p className="text-sm text-muted-foreground">
                Concern details and assigned windows.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* Concern */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Concern</p>

              <p className="text-sm text-muted-foreground">{concern.name}</p>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Department</p>

              <p className="text-sm text-muted-foreground">
                {concern.department?.name ?? "-"}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Description</p>

              <p className="text-sm text-muted-foreground">
                {concern.description ?? "-"}
              </p>
            </div>

            {/* Assigned Windows */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Assigned Windows</p>

                <p className="text-sm text-muted-foreground">
                  {concern.windows.length} assigned window
                  {concern.windows.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="space-y-2">
                {concern.windows.length > 0 ? (
                  concern.windows.map((window) => (
                    <div
                      key={window.id}
                      className="rounded-md border px-3 py-3"
                    >
                      <p className="text-sm font-medium">{window.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No windows assigned.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConcernView;
    