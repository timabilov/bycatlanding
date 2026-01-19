import Link from "next/link";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Frequently Asked Questions",
  items = [
    {
      question: "What formats can Bycat AI process?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            Bycat AI is designed to be your all-in-one study companion. We currently support:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground mb-4 space-y-1">
            <li><strong>YouTube Videos:</strong> Just paste the URL.</li>
            <li><strong>Documents:</strong> PDF files, slides, and text documents.</li>
            <li><strong>Audio:</strong> Recorded lectures, voice memos, and meetings (MP3, WAV, etc.).</li>
            <li><strong>Images:</strong> Photos of whiteboards, handwritten notes, or textbook pages.</li>
          </ul>
        </>
      ),
    },
    {
      question: "How accurate are the notes and summaries?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            We utilize state-of-the-art AI models (similar to GPT-4o and Claude 3.5) to ensure high accuracy and context awareness.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            The AI captures key concepts, definitions, and timelines. However, we always recommend reviewing the generated notes—which you can easily edit and refine within our platform.
          </p>
        </>
      ),
    },
    {
      question: "Can I use Bycat AI for languages other than English?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Absolutely! Bycat AI is multilingual. You can upload content in one language and ask the AI to generate notes, summaries, or quizzes in another.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            This is perfect for international students or anyone learning a new language.
          </p>
        </>
      ),
    },
    {
      question: 'Is there a free version available?',
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Yes, Bycat AI offers a generous free tier. You can process a limited number of files and generate quizzes daily without paying a cent.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            For power users who need unlimited uploads, longer audio processing, and advanced reasoning models, we offer a Pro plan. Check out our{" "}
            <Link href="/pricing" className="text-foreground underline">
              pricing page
            </Link>{" "}
            for details.
          </p>
        </>
      ),
    },
    {
      question: "Can I interact with the notes after they are generated?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[580px]">
          Yes. Once your content is processed, you gain access to an <strong>AI Chat</strong> interface contextually aware of that specific document. You can ask for clarifications, specific examples, or even ask it to rewrite sections in a simpler tone.
        </p>
      ),
    },
    {
      question: "My lecture files are large. What are the limits?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            We know lectures can be long. Bycat AI supports YouTube videos up to <strong>2 hours</strong> and audio files up to <strong>3 hours</strong> long.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            For PDFs, we can process documents up to 500 pages. If you have specific enterprise needs, please{" "}
             <a
              href="mailto:support@bycat.ai"
              className="underline underline-offset-2 text-foreground"
            >
              contact us
            </a>.
          </p>
        </>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}