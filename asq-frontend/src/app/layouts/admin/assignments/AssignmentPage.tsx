import axios from "axios";

import React, { useContext, useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { AppContext } from "@context/AppContext";
import AuthenticationService from "@services/AuthenticationService";

import AssignmentTable from "./AssignmentTable";
import AssignmentDialog from "./AssignmentDialog";

interface Window {
  id: number;
  name: string;
  description: string | null;
  department_id: number;
  assigned_to: number | null;
}

interface Department {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface Assignment {
  id: number;
  department: string;
  window: string;
  assignedUser: string | null;
}

const AssignmentPage: React.FC = (): React.ReactElement => {
  const { user, setUser } = useContext(AppContext);

  const [windows, setWindows] = useState<Window[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const [showAssignmentDialog, setShowAssignmentDialog] =
    useState<boolean>(false);

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

  const fetchWindows = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await auth.current.windowIndex(page);

      console.log("ASSIGNMENT WINDOWS:", response);

      setWindows(response.data);

      setPaginationMeta({
        currentPage: response.current_page,
        perPage: response.per_page,
        total: response.total,
        lastPage: response.last_page,
      });

      const departmentResponse = await auth.current.departmentAll();

      console.log("ASSIGNMENT DEPARTMENTS:", departmentResponse);

      setDepartments(departmentResponse);

      const userResponse = await auth.current.userAll();

      console.log("ASSIGNMENT USERS:", userResponse);

      setUsers(userResponse);
    } catch (error) {
      console.error("Failed to fetch assignment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchWindows(page);
  };

  const assignments: Assignment[] = windows.map((window) => {
    const department = departments.find(
      (department) => department.id === window.department_id,
    );

    const assignedUser = users.find((user) => user.id === window.assigned_to);

    return {
      id: window.id,
      department: department?.name ?? "Unknown Department",
      window: window.name,
      assignedUser: assignedUser
        ? `${assignedUser.firstname} ${assignedUser.lastname}`
        : null,
    };
  });

  const handleAssign = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentDialog(true);
  };

  const handleUserAssign = async (selectedUser: User) => {
    if (!selectedAssignment) {
      return;
    }

    try {
      await auth.current.assignWindow(selectedAssignment.id, {
        user_id: selectedUser.id,
      });

      toast.success("User assigned successfully.");

      console.log("USER ASSIGNED:", selectedUser);

      handleCloseDialog();

      await fetchWindows();
    } catch (error) {
        console.error("Failed to assign user:", error);

        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message ?? "Failed to assign user.";

          toast.error(message);
        } else {
          toast.error("Failed to assign user.");
        }
    }
  };

  const handleCloseDialog = () => {
    setShowAssignmentDialog(false);
    setSelectedAssignment(null);
  };

  useEffect(() => {
    fetchWindows();
  }, []);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          User ↔ Window Assignment
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage which users are assigned to each queue window.
        </p>
      </div>

      <AssignmentTable
        assignments={assignments}
        loading={loading}
        paginationMeta={paginationMeta}
        onPageChange={handlePageChange}
        onAssign={handleAssign}
      />

      {selectedAssignment && (
        <AssignmentDialog
          open={showAssignmentDialog}
          onClose={handleCloseDialog}
          windowName={selectedAssignment.window}
          assignedUser={selectedAssignment.assignedUser}
          users={users}
          onAssign={handleUserAssign}
        />
      )}
    </div>
  );
};

export default AssignmentPage;
