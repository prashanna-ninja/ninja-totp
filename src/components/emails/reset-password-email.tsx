import { Button, Hr, Link, Section, Text } from "@react-email/components";
import BaseEmail from "./base-email";

interface ResetPasswordEmailProps {
  url: string;
}

export default function ResetPasswordEmail({ url }: ResetPasswordEmailProps) {
  return (
    <BaseEmail
      preview="Reset your Ninja TOTP password"
      heading="Reset your password"
      footerText="If you didn't request this, you can safely ignore this email."
    >
      <Text className="mb-6 text-sm leading-relaxed text-gray-500">
        We received a request to reset your master password. Click the button
        below to choose a new one. This link will expire in 1 hour.
      </Text>

      <Section className="mb-6 text-center">
        <Button
          href={url}
          className="rounded-md bg-[#3aab60] px-8 py-3 text-sm font-semibold text-white no-underline"
        >
          Reset Password
        </Button>
      </Section>

      <Hr className="my-6 border-gray-200" />

      <Text className="mb-2 text-xs text-gray-500">
        If the button doesn&apos;t work, copy and paste this link into your browser:
      </Text>
      <Text className="m-0 break-all text-xs text-[#0a0a0a]">
        <Link href={url} className="text-[#0a0a0a]">
          {url}
        </Link>
      </Text>
    </BaseEmail>
  );
}
