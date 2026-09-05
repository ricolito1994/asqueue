import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@context/AppContext";
import { Plus } from "lucide-react";

import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

import AuthenticationService from "@services/AuthenticationService";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  full_name: string;
  username: string;
  email: string;
  created_at: string;
}

interface PaginationMeta {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

const UsersPage: React.FC = (): React.ReactElement => {
  const { user, setUser } = useContext(AppContext);

  const [showUserForm, setShowUserForm] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [paginationMeta, setPaginationMeta] = useState<
    PaginationMeta | undefined
  >(undefined);

  const onRefreshToken = (data: any) => {
    setUser((prev: any) => ({
      ...prev,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }));
  };

  const auth = useRef(
    new AuthenticationService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
      onRefreshToken,
    ),
  );

  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await auth.current.userIndex(page);

      console.log("USERS API RESPONSE:", response);

      setUsers(response.data);

      setPaginationMeta({
        currentPage: response.current_page,
        perPage: response.per_page,
        total: response.total,
        lastPage: response.last_page,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data: any) => {
    try {
      setSuccessMessage(null);

      const response = await auth.current.createUser(data);

      console.log("CREATE USER RESPONSE:", response);

      await fetchUsers(1);

      setShowUserForm(false);
      setSuccessMessage("User created successfully.");
    } catch (error) {
      console.error("Failed to create user:", error);

      throw error;
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>

          <p className="text-sm text-muted-foreground">
            Manage users and their account access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUserForm(true)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Add User
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {/* Toolbar */}
      <UserToolbar />

      {/* Table */}
      <UserTable
        users={users}
        loading={loading}
        paginationMeta={paginationMeta}
        onPageChange={fetchUsers}
      />

      {/* Add User Sheet */}
      <UserForm
        open={showUserForm}
        onClose={() => setShowUserForm(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UsersPage;
