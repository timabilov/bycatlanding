"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles,
  Zap,
  BookOpen,
  BrainCircuit
} from "lucide-react";

// UI Components
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import GridBackground from "@/components/ui/grid-background";
import Navbar from "@/components/sections/navbar/default";
import Glow from "@/components/ui/glow";
import { cn } from "@/lib/utils";

// CORRECTED FOOTER IMPORT
import Footer from "@/components/sections/footer/default";

// --- Mock Data & Helpers ---

const CATEGORIES = ["All", "Neuroscience", "Productivity", "Product Updates"];

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Neuroscience of Active Recall",
    excerpt: "Why rereading notes is a waste of time, and how 'testing yourself' physically changes your brain structure for better retention.",
    date: "Oct 12, 2024",
    readTime: "5 min",
    category: "Neuroscience",
    slug: "active-recall",
    featured: true,
    gradient: "from-violet-500/20 via-purple-500/5 to-transparent", // Custom mood
  },
  {
    id: 2,
    title: "Spaced Repetition Algorithms Explained",
    excerpt: "Breaking down the math behind the Leitner system and how AI optimizes your daily reviews.",
    date: "Oct 08, 2024",
    readTime: "8 min",
    category: "Product Updates",
    slug: "spaced-repetition",
    gradient: "from-blue-500/20 via-cyan-500/5 to-transparent",
  },
  {
    id: 3,
    title: "Digital Minimalism for Students",
    excerpt: "Configuring your digital environment to reduce cognitive load and enter flow states faster.",
    date: "Sep 28, 2024",
    readTime: "4 min",
    category: "Productivity",
    slug: "digital-minimalism",
    gradient: "from-emerald-500/20 via-green-500/5 to-transparent",
  },
  {
    id: 4,
    title: "Quiz Generation 2.0",
    excerpt: "Generate quizzes from YouTube videos, PDFs, and audio lectures instantly.",
    date: "Sep 15, 2024",
    readTime: "3 min",
    category: "Product Updates",
    slug: "quiz-gen-2",
    gradient: "from-orange-500/20 via-amber-500/5 to-transparent",
  },
  {
    id: 5,
    title: "The Forgetting Curve",
    excerpt: "You forget 50% of what you learn in an hour. Here is the schedule to stop it.",
    date: "Aug 22, 2024",
    readTime: "7 min",
    category: "Neuroscience",
    slug: "forgetting-curve",
    gradient: "from-pink-500/20 via-rose-500/5 to-transparent",
  },
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(p => p.featured);
  const otherPosts = filteredPosts.filter(p => !p.featured);

  return (
    <main className="bg-background text-foreground min-h-screen w-full flex flex-col relative overflow-hidden font-sans">
      <GridBackground />
      <Navbar />

      <Section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto max-w-7xl px-4">
          
          {/* 1. HERO HEADER */}
          <div className="flex flex-col items-center text-center space-y-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-lg shadow-primary/10"
            >
              <Sparkles className="size-3.5" />
              <span>The Study Log</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl"
            >
              Insights for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Superlearners</span>
            </motion.h1>
            
            {/* Search & Filter Bar */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-2xl flex flex-col md:flex-row gap-4 items-center p-2 rounded-[24px] border border-border/40 bg-background/60 backdrop-blur-xl shadow-xl"
            >
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3.5 size-5 text-muted-foreground/50" />
                <Input 
                  placeholder="Search topics..." 
                  className="pl-12 h-12 rounded-2xl border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto p-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                      activeCategory === cat 
                        ? "bg-foreground text-background shadow-md" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div> */}
          </div>

          {/* 2. FEATURED POST (Hero Card) */}
          {featuredPost && activeCategory === "All" && !searchQuery && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <Link href={`/blogs/${featuredPost.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[40px] border border-border/50 bg-background/30 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group-hover:border-primary/20">
                  
                  {/* Dynamic Abstract Background */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 transition-opacity duration-500 group-hover:opacity-50", featuredPost.gradient)} />
                  
                  <div className="relative p-8 md:p-16 flex flex-col md:flex-row gap-8 md:items-end justify-between">
                    <div className="space-y-6 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-background/50 backdrop-blur border-border/50 px-3 py-1 text-xs">
                          <Zap className="mr-1.5 size-3 text-amber-500" />
                          Featured Story
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                          <Clock className="size-3.5" /> {featuredPost.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* "Read" Button */}
                    <div className="size-16 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-15deg]">
                      <ArrowRight className="size-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* 3. POSTS GRID */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {(activeCategory === "All" && !searchQuery ? otherPosts : filteredPosts).map((post) => (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  layout
                >
                  <Link href={`/blogs/${post.slug}`} className="group block h-full">
                    <div className="relative h-full flex flex-col justify-between p-8 rounded-[32px] border border-border/40 bg-background/20 backdrop-blur-sm transition-all duration-300 hover:bg-background/40 hover:border-border/80 hover:-translate-y-1 overflow-hidden">
                      
                      {/* Subtle Top Gradient Line */}
                      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity", post.gradient)} />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-muted/50 text-muted-foreground hover:bg-muted font-normal">
                            {post.category}
                          </Badge>
                          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <Calendar className="size-3" /> {post.date}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-8 mt-auto flex items-center text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        Read Article
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex size-16 items-center justify-center rounded-full bg-muted/20 mb-4">
                <BookOpen className="size-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No articles found</h3>
              <p className="text-muted-foreground">Try clearing your search or filters.</p>
              <Button 
                variant="link" 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-2 text-primary"
              >
                Clear all filters
              </Button>
            </div>
          )}

        </div>
      </Section>

      <Footer />
    </main>
  );
}