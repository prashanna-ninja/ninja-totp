import { getUserRole, isSuperAdmin } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { organizationSchema } from "@/validations/organization";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  if (!(await getUserRole())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const organizations = await prisma.organization.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(organizations);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await getUserRole())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!(await isSuperAdmin())) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  try {
    const data = organizationSchema.parse(body);

    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        color: data.color || null,
        image: data.image || null,
      },
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0].message },
        { status: 400 },
      );
    }
    console.error("Error creating organization:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
