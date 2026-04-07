import "@/app/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/contexts/theme-provider";
import { inter } from "@/lib/fonts";

import { siteConfig } from "../config/site";

export const metadata: Metadata = {
  title: 'Bycat AI | Turn Lectures, PDFs & YouTube into Study Notes',
  description: 'The ultimate AI study app. Upload up to 500-page PDFs, 2-hour YouTube videos, and 3-hour audio lectures. Bycat AI instantly generates notes, flashcards, and quizzes.',
  keywords:[
    'AI study app', 
    'YouTube to notes AI', 
    'PDF to flashcards maker', 
    'AI audio transcription for students',
    'AI quiz generator',
    'chat with PDF',
    'lecture audio to text',
  ],
  openGraph: {
    title: 'Bycat AI | Study Smarter, Not Harder',
    description: 'Instantly convert YouTube videos, PDFs, and audio lectures into interactive flashcards, quizzes, and notes.',
    url: 'https://bycat.ai',
    siteName: 'Bycat AI',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: "/catpenlight.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} className="dark">
      <body className={`${inter.className} bg-background antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
