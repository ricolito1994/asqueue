import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface DepartmentFormData {
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface DepartmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => Promise<void>;
  department?: Department | null;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  open,
  onClose,
  onSubmit,
  department,
}): React.ReactElement | null => {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
      });
    } else {
      setFormData({
        name: "",
      });
    }

    setError(null);
  }, [department]);

  const isEditMode = !!department;

  if (!open) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      await onSubmit(formData);

      setFormData({
        name: "",
      });
    } catch (error: any) {
      console.error("Failed to save department:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.reason ||
        "Failed to save department. Please try again.";

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
              {isEditMode ? "Edit Department" : "Add Department"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isEditMode
                ? "Update the department information."
                : "Create a new department."}
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

            {/* Department Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Department Name
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
              disabled={submitting}
              className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isEditMode
                ? submitting
                  ? "Updating..."
                  : "Update Department"
                : submitting
                  ? "Creating..."
                  : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DepartmentForm;
