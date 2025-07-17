import React from "react";
import { twMerge } from "tailwind-merge";

export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge("flex-1 space-y-4 p-6", className)}>{children}</div>
  );
}
