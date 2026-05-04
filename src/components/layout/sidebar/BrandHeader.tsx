"use client";

import { NinjaLogo } from "@/components/custom-ui/custom-logo/ninja-logo";

interface BrandHeaderProps {
  collapsed?: boolean;
}

export default function BrandHeader({ collapsed = false }: BrandHeaderProps) {
  return <NinjaLogo variant="sidebar" collapsed={collapsed} />;
}
