import { Resend } from "resend";
import ResetPasswordEmail from "@/components/emails/reset-password-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, url: string) => {
  const { data, error } = await resend.emails.send({
    from: "Ninja TOTP <onboarding@resend.dev>",
    to: email,
    subject: "Reset Your Password",
    react: ResetPasswordEmail({ url }),
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send reset password email");
  }

  console.log("Email sent:", data);
};
