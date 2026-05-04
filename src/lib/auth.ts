import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor, magicLink } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { UserRole } from "@/generated/prisma/enums";
import {
  sendResetPasswordEmail,
  sendOtpEmail,
  sendMagicLinkEmail,
} from "@/lib/resend";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail(user.email, url);
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.USER,
        input: false,
      },
    },
  },
  plugins: [
    twoFactor({
      skipVerificationOnEnable: true,
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          await sendOtpEmail(user.email, otp);
        },
      },
    }),
    magicLink({
      expiresIn: 600,
      disableSignUp: true,
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail(email, url);
      },
    }),
  ],
});
