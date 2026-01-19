import {
  FileTextIcon,
  ImageIcon,
  LanguagesIcon,
  MessageSquareTextIcon,
  MicIcon,
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
  title = "Turn any content into knowledge.",
  items = [
    {
      title: "Video to Notes",
      description: "Paste a YouTube link and get a comprehensive summary, transcript, and key points in seconds.",
      icon: <YoutubeIcon className="size-5 stroke-1" />,
    },
    {
      title: "Smart PDF Reader",
      description: "Upload textbooks, research papers, or slides. We extract the text and organize the insights for you.",
      icon: <FileTextIcon className="size-5 stroke-1" />,
    },
    {
      title: "Audio Transcription",
      description:
        "Record lectures or upload audio files. Perfect for meetings, seminars, and voice memos.",
      icon: <MicIcon className="size-5 stroke-1" />,
    },
    {
      title: "Visual Learning",
      description: "Snap a photo of the whiteboard or upload screenshots. Our AI analyzes images to extract information.",
      icon: <ImageIcon className="size-5 stroke-1" />,
    },
    {
      title: "Interactive AI Chat",
      description: "Don't just read—ask. Chat with your notes to clear up doubts or dig deeper into specific topics.",
      icon: <MessageSquareTextIcon className="size-5 stroke-1" />,
    },
    {
      title: "Custom Prompts",
      description: "Tailor the output to your needs. Ask for a glossary, a 5th-grade explanation, or a specific summary format.",
      icon: <SparklesIcon className="size-5 stroke-1" />,
    },
    {
      title: "Multi-language Support",
      description:
        "Study materials in any language. Translate complex texts or generate notes in your native tongue.",
      icon: <LanguagesIcon className="size-5 stroke-1" />,
    },
    {
      title: "Sync Across Devices",
      description:
        "Start on the web, review on the go. Your library and study progress sync seamlessly to our mobile app.",
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