"use client";

import { useConsent } from "@/context/ConsentContext";
import { CookieBanner } from "@/components/cookie-banner";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setConsentGiven } = useConsent();

  return (
    <>
      {children}
      <CookieBanner acceptAction={() => setConsentGiven(true)} />
    </>
  );
}
