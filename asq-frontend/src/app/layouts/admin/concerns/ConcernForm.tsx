import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import AuthenticationService from "@services/AuthenticationService";

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

interface Department {
  id: number;
  name: string;
}

interface ConcernFormProps {
  open: boolean;
  onClose: () => void;
  concern: Concern | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  onRefreshToken?: (data: any) => void;
  onSubmit: (data: {
    name: string;
    description: string;
    department_id: number;
  }) => Promise<void>;
}

const ConcernForm: React.FC<ConcernFormProps> = ({
  open,
  onClose,
  concern,
  accessToken,
  refreshToken,
  onRefreshToken,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [error, setError] = useState("");

  const auth = useRef(
    new AuthenticationService(
      accessToken ?? null,
      null,
      refreshToken,
      onRefreshToken,
    ),
  );

  useEffect(() => {
    if (!open || !concern) {
      return;
    }

    setName(concern.name);
    setDescription(concern.description ?? "");
    setDepartmentId(String(concern.department_id));
    setError("");
  }, [open, concern]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);

        const response = await auth.current.departmentAll();

        setDepartments(response);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setError("Failed to load departments.");
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, [open]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Concern name is required.");
      return;
    }

    if (!departmentId) {
      setError("Department is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        department_id: Number(departmentId),
      });

      onClose();
    } catch (error: any) {
      console.error("Failed to update concern:", error);

      setError(error?.response?.data?.message ?? "Failed to update concern.");
    } finally {
      setSubmitting(false);
    }
  };

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
              <h2 className="text-lg font-semibold">Edit Concern</h2>

              <p className="text-sm text-muted-foreground">
                Update concern information.
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {/* Concern Name */}
              <div className="space-y-2">
                <label htmlFor="concern-name" className="text-sm font-medium">
                  Concern
                </label>

                <input
                  id="concern-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label
                  htmlFor="concern-department"
                  className="text-sm font-medium"
                >
                  Department
                </label>

                <select
                  id="concern-department"
                  value={departmentId}
                  onChange={(event) => setDepartmentId(event.target.value)}
                  disabled={loadingDepartments}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">
                    {loadingDepartments
                      ? "Loading departments..."
                      : "Select department"}
                  </option>

                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="concern-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="concern-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-2 border-t px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConcernForm;
