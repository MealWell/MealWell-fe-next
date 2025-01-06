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

interface EmailVerificationProps {
  username?: string;
  verificationUrl?: string;
}

export const EmailVerificationEmail = ({
  username = "there", // Default fallback
  verificationUrl = "#", // Default fallback
}: EmailVerificationProps) => {
  const previewText = `Verify your MealWell email address`;

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
              Verify your <strong>MealWell</strong> email address
            </Heading>

            {/* Greeting */}
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>

            {/* Instructional Text */}
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for registering with MealWell. To complete the
              registration process, please verify your email address by clicking
              the button below.
            </Text>

            {/* Verification Button */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={verificationUrl}
                aria-label="Verify your email address"
              >
                Verify Email
              </Button>
            </Section>

            {/* Alternative Link */}
            <Text className="text-black text-[14px] leading-[24px]">
              Or copy and paste this URL into your browser:{" "}
              <Link
                href={verificationUrl}
                className="text-blue-600 no-underline"
              >
                {verificationUrl}
              </Link>
            </Text>

            {/* Divider */}
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* Footer Text */}
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you didn&#39;t request this verification, please ignore this
              email or contact support if you have concerns.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export function reactEmailVerificationEmail(props: EmailVerificationProps) {
  return <EmailVerificationEmail {...props} />;
}
