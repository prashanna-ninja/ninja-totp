import type { Organization } from "@/generated/prisma/client";
import type { OrganizationInput } from "@/validations/organization";

export const ORGANIZATION_QUERY_KEY = "organizations";

export async function fetchOrganizations(): Promise<Organization[]> {
  const res = await fetch("/api/organization");
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to load organizations");
  }
  return res.json();
}

export async function createOrganization(
  data: OrganizationInput,
): Promise<Organization> {
  const res = await fetch("/api/organization", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to create organization");
  }
  return res.json();
}

export async function updateOrganization(
  id: string,
  data: OrganizationInput,
): Promise<Organization> {
  const res = await fetch(`/api/organization/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to update organization");
  }
  return res.json();
}
