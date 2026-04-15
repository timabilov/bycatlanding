import {
  FileTextIcon,
  Headset,
  ImageIcon,
  LanguagesIcon,
  MessageSquareTextIcon,
  MicIcon,
  PhoneCall,
  SmartphoneIcon,
  SparklesIcon,
  YoutubeIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

export default function Items({
  title = "Everything you actually need to study smarter.",
  items = [
    {
      title: "YouTube to Notes",
      description: "Drop a lecture link, get clean notes. No more rewatching 2-hour videos to find that one concept.",
      icon: <YoutubeIcon className="size-5 stroke-1" />,
    },
    {
      title: "PDF & Paper Reader",
      description: "Upload your textbook or research paper. We pull out what matters so you can skip the fluff.",
      icon: <FileTextIcon className="size-5 stroke-1" />,
    },
    {
      title: "Audio Transcription",
      description:
        "Record your lecture or drop in an audio file. Get a full transcript you can actually search through.",
      icon: <MicIcon className="size-5 stroke-1" />,
    },
    {
      title: "Image to Notes",
      description: "Snap the whiteboard before it gets erased. Upload slides, diagrams, screenshots — we read it all.",
      icon: <ImageIcon className="size-5 stroke-1" />,
    },
    {
      title: "Chat With Your Notes",
      description: "Stuck on something? Ask your notes directly. It's like having a study buddy who actually read the material.",
      icon: <MessageSquareTextIcon className="size-5 stroke-1" />,
    },
    {
      title: "Custom Output",
      description: "Need a glossary? A simplified breakdown? Flashcard format? Tell it what you need, get exactly that.",
      icon: <SparklesIcon className="size-5 stroke-1" />,
    },
    {
      title: "Live AI Tutor",
      description:
        "Real-time help when you're stuck. 2 sessions a day with an AI that actually understands your material.",
      icon: <Headset className="size-5 stroke-1" />,
    },
    {
      title: "Works Everywhere",
      description:
        "Web, iOS, Android. Start studying on your laptop, keep going on the bus. Everything stays in sync.",
      icon: <SmartphoneIcon className="size-5 stroke-1" />,
    },
  ],
  className,
}: ItemsProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item, index) => (
              <Item key={index}>
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}


<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity":[
        {
          "@type": "Question",
          "name": "What formats can Bycat AI process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bycat AI can process YouTube videos (up to 2 hours), Audio files (up to 3 hours), PDFs and Documents (up to 500 pages), and Images."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use Bycat AI for languages other than English?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Bycat AI features multi-language support. You can upload study materials in any language and translate complex texts or generate notes in your native tongue."
          }
        },
        {
          "@type": "Question",
          "name": "Is Bycat AI available for Android and iOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! All subscription plans include full access to both the iOS and Android mobile apps, syncing your study progress seamlessly across all devices."
          }
        }
      ]
    })
  }}
/>