import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Study tips backed by neuroscience, product updates, and guides on how to learn faster with AI — from the Bycat AI team.",
  alternates: {
    canonical: "https://bycat.ai/blogs",
  },
  openGraph: {
    title: "Blog | Bycat AI",
    description:
      "Study tips backed by neuroscience, product updates, and guides on how to learn faster with AI.",
    type: "website",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
