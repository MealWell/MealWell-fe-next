import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";
import { ChefHat } from "lucide-react";
import * as React from "react";

interface OtpCodeVerificationProps {
  username?: string;
  otpCode?: string;
}

export const OtpCodeVerificationEmail = ({
  username = "there", // Default fallback
  otpCode = "", // Default fallback
}: OtpCodeVerificationProps) => {
  const previewText = `Verify your OTP code for MealWell`;

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
              Verify your <strong>MealWell</strong> OTP code
            </Heading>

            {/* Greeting */}
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>

            {/* Instructional Text */}
            <Text className="text-black text-[14px] leading-[24px]">
              You recently requested an OTP code for logging in or verifying
              your identity. Please use the following code to complete your
              action.
            </Text>

            {/* OTP Code Display */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-[18px] font-semibold">
                Your OTP Code: <strong>{otpCode}</strong>
              </Text>
            </Section>

            {/* Alternative Link */}
            <Text className="text-black text-[14px] leading-[24px]">
              If you didn&#39;t request an OTP, please ignore this email or
              contact support if you have concerns.
            </Text>

            {/* Divider */}
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* Footer Text */}
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This is a one-time password (OTP) and expires in a short period.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export function reactOtpCodeVerificationEmail(props: OtpCodeVerificationProps) {
  return <OtpCodeVerificationEmail {...props} />;
}
