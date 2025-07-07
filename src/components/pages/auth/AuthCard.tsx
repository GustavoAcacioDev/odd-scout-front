import React from "react";

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 p-4 w-full max-w-[400px]">
      {children}
    </div>
  );
}

export default AuthCard;
