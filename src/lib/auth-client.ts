import { createAuthClient } from "better-auth/react";
import { twoFactorClient, magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [twoFactorClient(), magicLinkClient()],
});

export const { signIn, signUp, signOut, useSession, requestPasswordReset, resetPassword } = authClient;
