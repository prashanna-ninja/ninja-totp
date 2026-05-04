"use client";

import { useQuery } from "@tanstack/react-query";

import {
  ORGANIZATION_QUERY_KEY,
  fetchOrganizations,
} from "@/lib/services/organization";
import OrganizationCard from "./OrganizationCard";

const STATIC_TOTAL_MEMBERS = 0;
const STATIC_TOTAL_VAULTS = 0;
const STATIC_TOTAL_CODES = 0;

type StatBoxProps = {
  label: string;
  value: number | string;
};

function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="rounded-xl border border-border bg-white px-5 py-4">
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-2xl font-bold text-foreground mt-1.5 leading-none">
        {value}
      </p>
    </div>
  );
}

function OrganizationsGrid() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [ORGANIZATION_QUERY_KEY],
    queryFn: fetchOrganizations,
  });

  const orgCount = data?.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="ORGANIZATIONS" value={orgCount} />
        <StatBox label="TOTAL MEMBERS" value={STATIC_TOTAL_MEMBERS} />
        <StatBox label="TOTAL VAULTS" value={STATIC_TOTAL_VAULTS} />
        <StatBox label="TOTAL CODES" value={STATIC_TOTAL_CODES} />
      </div>

      <div>
        <p className="text-[11px] font-medium tracking-wider text-muted-foreground mb-3">
          ALL ORGANIZATIONS
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[230px] rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load organizations"}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-sm font-medium text-foreground">
              No organizations yet
            </p>
            <p className="text-[13px] text-muted-foreground mt-1">
              Click &ldquo;Add Organization&rdquo; to create your first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizationsGrid;
