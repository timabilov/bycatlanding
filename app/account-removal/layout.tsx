import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Removal",
  description:
    "Request deletion of your Bycat AI account and all associated data. Permanent removal is processed within 7-14 days.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://bycat.ai/account-removal",
  },
};

export default function AccountRemovalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
