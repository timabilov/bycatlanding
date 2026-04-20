import Link from "next/link";
import { ReactNode } from "react";

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
      question: "Is Bycat AI free?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            <strong>Yes!</strong> Bycat AI offers a generous free tier. You can use it to process files, generate quizzes, and access basic summaries every day without paying.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            For unlimited usage, longer video processing, and advanced AI models, we offer affordable Pro plans. Check out our{" "}
            <Link href="/pricing" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              pricing page
            </Link>.
          </p>
        </>
      ),
    },
    {
      question: "Is it legal to use it in my school?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            <strong>Yes!</strong> The application is designed to comply with educational standards and regulations.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            It does not provide or solve answers for students to copy-paste. Instead, it encourages <strong>active learning</strong> by offering tools such as interactive questions, flashcards, and notifications to help students engage with and question the subject matter effectively.
          </p>
        </>
      ),
    },
    {
      question: "Is Bycat AI available for Android and iOS?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[580px]">
          Currently available on iOS and Web. Android is coming soon — drop your email and we'll let you know when it's ready.
        </p>
      ),
    },
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
      question: "Can I use Bycat AI for languages other than English?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[580px]">
          Absolutely! Bycat AI is multilingual. You can upload content in one language and ask the AI to generate notes, summaries, or quizzes in another. This is perfect for international students or language learners.
        </p>
      ),
    },
    {
      question: "How accurate are the notes and summaries?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[600px]">
          We utilize state-of-the-art AI models (similar to GPT-4o and Claude 3.5) to ensure high accuracy and context awareness. However, we always recommend reviewing the generated notes—which you can easily edit and refine within our platform.
        </p>
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
                <AccordionTrigger className="text-left text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}