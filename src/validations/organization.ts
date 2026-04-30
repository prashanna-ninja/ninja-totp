import { z } from "zod";

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export const organizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be 50 characters or fewer"),
  color: z
    .union([
      z.string().regex(HEX_COLOR, "Must be a valid hex color"),
      z.literal(""),
    ])
    .optional(),
  image: z
    .union([z.url("Must be a valid URL"), z.literal("")])
    .optional(),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;
