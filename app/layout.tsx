import "@/app/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/contexts/theme-provider";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://bycat.ai"),
  title: {
    default: "Bycat AI — Turn Lectures, PDFs & YouTube into Study Notes",
    template: "%s | Bycat AI",
  },
  description:
    "Upload a 500-page PDF, a 2-hour YouTube video, or a 3-hour lecture recording. Bycat AI turns it into notes, flashcards, and quizzes so you actually remember what you studied.",
  keywords: [
    "AI study app",
    "YouTube to notes AI",
    "PDF to flashcards",
    "AI audio transcription for students",
    "AI quiz generator",
    "chat with PDF",
    "lecture audio to text",
    "study notes from YouTube",
    "flashcard maker AI",
    "Bycat AI",
  ],
  authors: [{ name: "SKRIPE AZ LLC", url: "https://skripe.com" }],
  creator: "SKRIPE AZ LLC",
  publisher: "SKRIPE AZ LLC",
  openGraph: {
    title: "Bycat AI — Turn Lectures, PDFs & YouTube into Study Notes",
    description:
      "Upload a PDF, YouTube video, or audio lecture. Get notes, flashcards, and quizzes in seconds.",
    url: "https://bycat.ai",
    siteName: "Bycat AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Bycat AI — AI study app for notes, flashcards, and quizzes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bycat AI — Turn Lectures, PDFs & YouTube into Study Notes",
    description:
      "Upload a PDF, YouTube video, or audio lecture. Get notes, flashcards, and quizzes in seconds.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/catpenlight.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://bycat.ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Bycat AI",
              url: "https://bycat.ai",
              applicationCategory: "EducationalApplication",
              operatingSystem: "iOS, Web",
              description:
                "AI study app that turns lectures, PDFs, and YouTube videos into notes, flashcards, and quizzes.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free tier available",
              },
              creator: {
                "@type": "Organization",
                name: "SKRIPE AZ LLC",
                url: "https://skripe.com",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
