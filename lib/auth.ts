import { betterAuth } from "better-auth";
import {
  bearer,
  admin,
  multiSession,
  twoFactor,
  oneTap,
  oAuthProxy,
  openAPI,
  oidcProvider,
} from "better-auth/plugins";
import { reactResetPasswordEmail } from "./email/reset-password";
import { resend } from "./email/resend";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "better-auth/plugins/passkey";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { mongoClient } from "@/db/mongoose";
import { reactEmailVerificationEmail } from "@/lib/email/email-activation";
import { reactOtpCodeVerificationEmail } from "@/lib/email/otp-code";

const from = process.env.MEAL_WELL_EMAIL || "delivered@resend.dev";
const to = process.env.TEST_EMAIL || "";

export const auth = betterAuth({
  appName: "MealWell",
  database: mongodbAdapter(mongoClient()),
  session: {
    freshAge: 0,
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      const res = await resend.emails.send({
        from,
        to: user.email || to,
        subject: "Verify your email address",
        react: reactEmailVerificationEmail({
          username: user.email,
          verificationUrl: url,
        }),
      });
      console.log(res, user.email);
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "facebook"],
    },
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from,
            to: user.email,
            subject: "Your OTP code",
            react: reactOtpCodeVerificationEmail({
              username: user.email,
              otpCode: otp,
            }),
          });
        },
      },
    }),
    passkey(),
    openAPI(),
    bearer(),
    admin(),
    multiSession(),
    oneTap(),
    oAuthProxy(),
    nextCookies(),
    oidcProvider({
      loginPage: "/sign-in",
    }),
  ],
});
