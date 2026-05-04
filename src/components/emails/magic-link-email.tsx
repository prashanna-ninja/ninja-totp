import { Button, Section, Text } from "@react-email/components";
import BaseEmail from "./base-email";

interface MagicLinkEmailProps {
  url: string;
}

export default function MagicLinkEmail({ url }: MagicLinkEmailProps) {
  return (
    <BaseEmail
      preview="Your Ninja TOTP sign-in link"
      heading="Sign in to Ninja TOTP"
      footerText="If you didn't request this link, you can safely ignore this email."
    >
      <Text className="mb-6 text-sm leading-relaxed text-gray-500">
        Click the button below to sign in. This link expires in 10 minutes and can only be used once.
      </Text>

      <Section className="mb-6 text-center">
        <Button
          href={url}
          className="rounded-lg bg-[#1c5231] px-8 py-3 text-sm font-semibold text-white no-underline"
        >
          Sign in to Ninja TOTP →
        </Button>
      </Section>

      <Text className="m-0 text-xs text-gray-400">
        Never share this link with anyone. Ninja TOTP staff will never ask for it.
      </Text>
    </BaseEmail>
  );
}
