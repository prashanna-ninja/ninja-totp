import { headers } from "next/headers";
import { UserRole } from "@/generated/prisma/enums";
import { auth } from "./auth";

export async function getUserRole(): Promise<UserRole | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return null;
  }
  return user.role as UserRole;
}

export async function isSuperAdmin() {
  const role = await getUserRole();
  return role === UserRole.SUPERADMIN;
}
