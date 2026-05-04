import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Organization } from "@/generated/prisma/client";
import OrganizationActionButton from "./OrganizationActionButton";

const DEFAULT_COLOR = "#64748b";

type Props = {
  organization: Organization;
};

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function formatJoined(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function OrganizationCard({ organization }: Props) {
  const accent = organization.color ?? DEFAULT_COLOR;
  const initials = getInitials(organization.name);

  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-1.5 bg-brand-dark-background" />

      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="size-14 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-brand-dark-background">
            {organization.image ? (
              <Image
                src={organization.image}
                alt={organization.name}
                width={56}
                height={56}
                className="size-full object-contain p-1"
                unoptimized
              />
            ) : (
              <span className="text-gray-700 font-bold text-lg tracking-tight">
                {initials}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 my-auto">
            <h3 className="font-bold text-xl leading-tight text-foreground line-clamp-2 break-words">
              {organization.name}
            </h3>
          </div>

          <OrganizationActionButton organization={organization} />
        </div>

        <div className="mt-5 grid grid-cols-3 rounded-xl bg-brand-dark-background py-3">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground leading-none">
              0
            </span>
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground mt-1.5">
              MEMBERS
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground leading-none">
              0
            </span>
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground mt-1.5">
              VAULTS
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground leading-none">
              0
            </span>
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground mt-1.5">
              CODES
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            Joined {formatJoined(organization.createdAt)}
          </div>
          <Link
            href={`/organizations/${organization.id}`}
            className="inline-flex items-center gap-1 font-medium text-foreground hover:underline"
          >
            View
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
