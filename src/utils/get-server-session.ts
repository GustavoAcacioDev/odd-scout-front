import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";

export function getSessionServer() {
  const session = getServerSession(authOptions);

  return session;
}
