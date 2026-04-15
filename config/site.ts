export const siteConfig = {
  name: "Bycat AI",
  version: "v2.7",
  url: "https://bycat.ai",
  getStartedUrl: "https://app.bycat.ai/",
  ogImage: "https://bycat.ai/og.jpg",
  description:
    "The AI study app that turns lectures, PDFs, and YouTube videos into notes, flashcards, and quizzes.",
  navigation: {
    terms: "/terms-conditions",
    privacy: "/privacy-policy",
    accountRemoval: "/account-removal",
    blogs: "/blogs",
  },
  links: {
    email: "mailto:support@skripe.com",
    skripe: "https://skripe.com/",
  },
};

export type SiteConfig = typeof siteConfig;
