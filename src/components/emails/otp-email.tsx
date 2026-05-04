import { Section, Text } from "@react-email/components";
import BaseEmail from "./base-email";

interface OtpEmailProps {
  otp: string;
}

export default function OtpEmail({ otp }: OtpEmailProps) {
  return (
    <BaseEmail
      preview={`Your Ninja TOTP verification code: ${otp}`}
      heading="Verify your login"
      footerText="If you didn't try to sign in, you can safely ignore this email."
    >
      <Text className="mb-4 text-sm leading-relaxed text-gray-500">
        Enter this 6-digit code to complete your sign-in. It expires in 3 minutes.
      </Text>

      <Section className="mb-6 rounded-lg bg-gray-50 px-8 py-6 text-center">
        <Text className="m-0 text-4xl font-bold tracking-[0.3em] text-[#0a0a0a]">
          {otp}
        </Text>
      </Section>

      <Text className="m-0 text-xs text-gray-400">
        Never share this code with anyone. Ninja TOTP staff will never ask for it.
      </Text>
    </BaseEmail>
  );
}
