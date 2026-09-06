import React, { useContext, useRef } from "react";
import { AppContext } from "@context/AppContext";
import AuthenticationService from "@services/AuthenticationService";

const UnassignedUserPage: React.FC = (): React.ReactElement => {
  const { user, setUser } = useContext(AppContext);

  const auth = useRef(
    new AuthenticationService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
    ),
  );

  const handleLogout = async () => {
    try {
      await auth.current.logout({});
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold">Account Not Assigned</h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Your account has not been assigned to any department or window yet.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Please contact your administrator for assistance.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UnassignedUserPage;
