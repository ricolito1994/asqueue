import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import AuthenticationService from "@services/AuthenticationService";

interface WindowFormData {
  name: string;
  description: string;
  department_id: number | null;
}

interface Window {
  id: number;
  name: string;
  description: string | null;
  department_id: number;
}

interface Department {
  id: number;
  name: string;
}

interface WindowFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WindowFormData) => Promise<void>;
  window?: Window | null;
  accessToken: string | null;
  refreshToken?: string | null;
  onRefreshToken: (data: any) => void;
}

const WindowForm: React.FC<WindowFormProps> = ({
  open,
  onClose,
  onSubmit,
  window,
  accessToken,
  refreshToken,
  onRefreshToken,
}): React.ReactElement | null => {
  const [formData, setFormData] = useState<WindowFormData>({
    name: "",
    description: "",
    department_id: null,
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useRef(
    new AuthenticationService(accessToken, null, refreshToken, onRefreshToken),
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadDepartments = async () => {
      try {
        setLoadingDepartments(true);
        setError(null);

        const response = await auth.current.departmentAll();

        setDepartments(response ?? []);
      } catch (error: any) {
        console.error("Failed to fetch departments:", error);

        const message =
          error?.response?.data?.message ||
          error?.response?.data?.reason ||
          "Failed to load departments. Please try again.";

        setError(message);
      } finally {
        setLoadingDepartments(false);
      }
    };

    loadDepartments();
  }, [open]);

  useEffect(() => {
    if (window) {
      setFormData({
        name: window.name,
        description: window.description ?? "",
        department_id: window.department_id,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        department_id: null,
      });
    }

    setError(null);
  }, [window, open]);

  const isEditMode = !!window;

  if (!open) {
    return null;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      department_id: value ? Number(value) : null,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.department_id) {
      setError("Please select a department.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await onSubmit(formData);

      setFormData({
        name: "",
        description: "",
        department_id: null,
      });
    } catch (error: any) {
      console.error("Failed to save window:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.reason ||
        "Failed to save window. Please try again.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close form"
        onClick={onClose}
        disabled={submitting}
        className="fixed inset-0 z-40 cursor-default bg-black/50 disabled:cursor-not-allowed"
      />

      {/* Sheet */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              {isEditMode ? "Edit Window" : "Add Window"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isEditMode
                ? "Update the window information."
                : "Create a new queue window."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-4" />

            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            {/* Window Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Window Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={submitting}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={submitting}
                rows={4}
                className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label htmlFor="department_id" className="text-sm font-medium">
                Department
              </label>

              <select
                id="department_id"
                name="department_id"
                value={formData.department_id ?? ""}
                onChange={handleDepartmentChange}
                required
                disabled={submitting || loadingDepartments}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {loadingDepartments
                    ? "Loading departments..."
                    : "Select a department"}
                </option>

                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-2 border-t px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-9 rounded-md border px-4 text-sm font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || loadingDepartments}
              className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isEditMode
                ? submitting
                  ? "Updating..."
                  : "Update Window"
                : submitting
                  ? "Creating..."
                  : "Create Window"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WindowForm;
