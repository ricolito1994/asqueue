import React from "react";

const UnassignedUserPage: React.FC = (): React.ReactElement => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold">Account Not Assigned</h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Your account has not been assigned to a department or service window
          yet.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Please contact your administrator for assistance.
        </p>
      </div>
    </div>
  );
};

export default UnassignedUserPage;
