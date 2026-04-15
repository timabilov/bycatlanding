import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bycat AI collects, stores, and protects your data. We only keep what we need to run the service and never sell your information.",
  alternates: {
    canonical: "https://bycat.ai/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
