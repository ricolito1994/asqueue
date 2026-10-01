import React, { useEffect, useRef, useState, useContext } from "react";

import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

import { AppContext } from "@context/AppContext";

import { QueueManagerService } from "@services/QueueManagerService";

import AsConfirmModal from "@components/modals/AsConfirmModal";

import ConcernForm from "./ConcernForm";

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
  onUpdated?: () => void;
}

const ConcernActions: React.FC<ConcernActionsProps> = ({
  concern,
  onView,
  onEdit,
  onUpdated,
}) => {
  const { user, setUser } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

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
    setEditOpen(true);
    onEdit?.(concern);
  };

  const handleCreate = () => {
    setOpen(false);
    setEditOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await queue.current.deleteConcern(concern.id);

      setDeleteOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error("Failed to delete concern:", error);
    }
  };

  const handleUpdate = async (data: {
    name: string;
    description: string;
    department_id: number;
  }) => {
    await queue.current.updateConcern(concern.id, data);

    onUpdated?.();
  };

  return (
    <>
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

      <ConcernForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        concern={concern}
        accessToken={user?.access_token ?? null}
        refreshToken={user?.refresh_token ?? null}
        onRefreshToken={onRefreshToken}
        onSubmit={handleUpdate}
      />

      <AsConfirmModal
        title="Delete Concern"
        content={`Are you sure you want to delete "${concern.name}"?`}
        isOpen={deleteOpen}
        onOk={confirmDelete}
        okText="Delete"
        onDeny={() => setDeleteOpen(false)}
        denyText="Cancel"
      />


    </>
  );
};

export default ConcernActions;
