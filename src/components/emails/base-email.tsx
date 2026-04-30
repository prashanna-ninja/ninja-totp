import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface BaseEmailProps {
  preview: string;
  heading?: string;
  children: React.ReactNode;
  footerText?: string;
}

export default function BaseEmail({
  preview,
  heading,
  children,
  footerText,
}: BaseEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="mx-auto my-0 bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-120 overflow-hidden rounded-lg bg-white shadow-sm">
            <Section className="bg-[#1c5231] px-10 py-8 text-center">
              <Heading className="m-0 text-[22px] font-bold tracking-tight text-white">
                Ninja TOTP
              </Heading>
            </Section>

            <Section className="px-10 py-10">
              {heading && (
                <Heading className="mb-2 mt-0 text-xl font-semibold text-[#0a0a0a]">
                  {heading}
                </Heading>
              )}
              {children}
            </Section>

            <Section className="border-t border-gray-200 bg-gray-50 px-10 py-6">
              {footerText && (
                <Text className="mb-1 mt-0 text-center text-xs text-gray-400">
                  {footerText}
                </Text>
              )}
              <Text className="m-0 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Ninja TOTP. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
