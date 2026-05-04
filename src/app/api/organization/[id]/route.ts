import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { getUserRole, isSuperAdmin } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { organizationSchema } from "@/validations/organization";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  if (!(await getUserRole())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error("Error fetching organization:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!(await getUserRole())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!(await isSuperAdmin())) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  try {
    const data = organizationSchema.parse(body);

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color || null,
        image: data.image || null,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0].message },
        { status: 400 },
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Organization not found" },
          { status: 404 },
        );
      }
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "An organization with that name already exists" },
          { status: 409 },
        );
      }
    }
    console.error("Error updating organization:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  if (!(await getUserRole())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!(await isSuperAdmin())) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.organization.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 },
      );
    }
    console.error("Error deleting organization:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
