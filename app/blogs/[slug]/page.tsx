"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon,
  ChevronRight
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import GridBackground from "@/components/ui/grid-background";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { cn } from "@/lib/utils";

// --- MOCK ARTICLE DATA ---
const ARTICLE = {
  title: "The Neuroscience of Active Recall",
  excerpt: "Why rereading notes is a waste of time, and how 'testing yourself' physically changes your brain structure for better retention.",
  author: {
    name: "Dr. Sarah Chen",
    role: "Cognitive Scientist",
    avatar: "SC"
  },
  date: "October 12, 2024",
  readTime: "5 min read",
  category: "Neuroscience",
  gradient: "from-violet-500/20 via-purple-500/5 to-transparent",
  content: `
    <p class="lead">Most students study by rereading their textbooks or highlighting notes. While this feels productive, neuroscience tells us it's one of the least effective ways to learn. Here is why.</p>

    <h2>The Fluency Illusion</h2>
    <p>When you read something for the second time, your brain recognizes it. "I know this," it says. This familiarity is called the <strong>fluency illusion</strong>. You aren't actually strengthening the neural pathway to retrieve that information; you're just recognizing the pattern on the page.</p>
    
    <p>Active Recall is different. It forces your brain to retrieve information from scratch. It's the difference between looking at a map and actually driving the route yourself.</p>

    <blockquote>
      "Every time you retrieve a memory, you alter it. You make the path to that memory stronger and easier to find next time."
    </blockquote>

    <h2>How the Brain Rewires Itself</h2>
    <p>When you struggle to remember an answer, that struggle is the learning happening. It signals to your hippocampus that this information is vital.</p>
    
    <ul>
      <li><strong>Synaptic Plasticity:</strong> Active retrieval strengthens the connections between neurons.</li>
      <li><strong>Myelination:</strong> Repeated firing of a circuit wraps the axon in myelin, speeding up the signal.</li>
    </ul>

    <h2>Implementing Bycat Systems</h2>
    <p>This is where the Bycat system comes in. By spacing out your active recall sessions based on how well you know the answer, you maximize efficiency. You don't study what you already know; you focus on the weak neural pathways.</p>
  `
};

const TABLE_OF_CONTENTS = [
  { id: "fluency", title: "The Fluency Illusion" },
  { id: "rewires", title: "How the Brain Rewires Itself" },
  { id: "bycat", title: "Implementing Bycat Systems" },
  { id: "conclusion", title: "Conclusion" },
];

export default function BlogPost() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-background text-foreground min-h-screen w-full flex flex-col relative overflow-hidden font-sans">
      <GridBackground />
      
      {/* 1. Reading Progress Bar (Fixed Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      {/* 2. HERO SECTION */}
      <Section className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto max-w-4xl px-4">
          
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>
          </div>

          {/* Header Card */}
          <div className="relative overflow-hidden rounded-[40px] border border-border/50 bg-background/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
            
            {/* Dynamic Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none", ARTICLE.gradient)} />
            
            <div className="relative z-10 space-y-6 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {ARTICLE.category}
                </Badge>
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> {ARTICLE.date}
                </span>
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {ARTICLE.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                {ARTICLE.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {ARTICLE.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
                <div className="size-12 rounded-full bg-muted border border-border flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {ARTICLE.author.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{ARTICLE.author.name}</p>
                  <p className="text-xs text-muted-foreground">{ARTICLE.author.role}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* 3. CONTENT & SIDEBAR */}
      <Section className="pb-24 relative z-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT: Socials (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              {/* <div className="sticky top-32 flex flex-col gap-4 items-center">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                  <Share2 className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                  <Bookmark className="size-5" />
                </Button>
                <div className="w-8 h-px bg-border my-2" />
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-blue-400">
                  <Twitter className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-blue-600">
                  <Linkedin className="size-5" />
                </Button>
              </div> */}
            </div>

            {/* CENTER: Main Content */}
            <div className="lg:col-span-8">
              <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-p:leading-relaxed prose-p:text-muted-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-li:text-muted-foreground
                ">
                
                {/* Rendering HTML string safely */}
                <div dangerouslySetInnerHTML={{ __html: ARTICLE.content }} />

              </article>

              {/* Bottom CTA */}
              <div className="mt-16 p-8 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-sm text-center space-y-6">
                <h3 className="text-2xl font-bold">Ready to apply Active Recall?</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Stop rereading and start testing. Upload your notes to Bycat AI and generate a quiz in seconds.
                </p>
                <Button size="lg" className="rounded-full px-8 text-base cursor-pointer">
                  Generate Quiz Now
                </Button>
              </div>
            </div>

            {/* RIGHT: Table of Contents (Sticky) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32 space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">On this page</h4>
                <nav className="flex flex-col gap-3 border-l border-border/50 pl-4">
                  {TABLE_OF_CONTENTS.map((item) => (
                    <a 
                      key={item.id} 
                      href={`#${item.id}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Newsletter Box */}
                {/* <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 space-y-3 mt-8">
                  <p className="text-sm font-semibold">Join 10,000+ students</p>
                  <p className="text-xs text-muted-foreground">Get the latest study tips delivered to your inbox.</p>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 min-w-0 rounded-lg bg-background border-0 text-xs px-3 focus:ring-2 focus:ring-primary/20"
                      placeholder="Email address"
                    />
                    <Button size="sm" className="rounded-lg bg-primary text-primary-foreground">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>

          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}