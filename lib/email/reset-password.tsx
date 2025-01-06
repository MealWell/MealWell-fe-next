import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";
import { ChefHat } from "lucide-react";
import * as React from "react";

interface BetterAuthResetPasswordEmailProps {
  username?: string;
  resetLink?: string;
}

export const ResetPasswordEmail = ({
  username = "there", // Default fallback
  resetLink = "#", // Default fallback
}: BetterAuthResetPasswordEmailProps) => {
  const previewText = `Reset your MealWell password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* Logo Section */}
            <Section className="text-center">
              <ChefHat className="text-[#000000] mx-auto h-10 w-10" />
            </Section>

            {/* Heading */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset your <strong>MealWell</strong> password
            </Heading>

            {/* Greeting */}
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>

            {/* Instructional Text */}
            <Text className="text-black text-[14px] leading-[24px]">
              We received a request to reset your password for your MealWell
              account. If you didn&#39;t make this request, you can safely
              ignore this email.
            </Text>

            {/* Reset Button */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetLink}
                aria-label="Reset your MealWell password"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Text className="text-black text-[14px] leading-[24px]">
              Or copy and paste this URL into your browser:{" "}
              <Link href={resetLink} className="text-blue-600 no-underline">
                {resetLink}
              </Link>
            </Text>

            {/* Divider */}
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* Footer Text */}
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you didn&#39;t request a password reset, please ignore this
              email or contact support if you have concerns.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export function reactResetPasswordEmail(
  props: BetterAuthResetPasswordEmailProps,
) {
  return <ResetPasswordEmail {...props} />;
}
