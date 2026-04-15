import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms of use for Bycat AI, including billing, refund policy (30-day guarantee), account rules, and license restrictions.",
  alternates: {
    canonical: "https://bycat.ai/terms-conditions",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
