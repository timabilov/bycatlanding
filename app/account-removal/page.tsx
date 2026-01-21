"use client";

import Link from "next/link";
import {
  Shield,
  Trash2,
  ArrowLeft,
  Mail,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Copy
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import GridBackground from "@/components/ui/grid-background";
import Navbar from "@/components/sections/navbar/default";
import { Footer, FooterContent, FooterColumn, FooterBottom } from "@/components/ui/footer";
import Glow from "@/components/ui/glow";
import { cn } from "@/lib/utils";

export default function AccountRemoval() {
  const [copied, setCopied] = useState(false);
  
  const supportEmail = "support@skripe.com";
  const subjectLine = "Account Removal Request - Leitner AI";

  const handleCopy = () => {
    navigator.clipboard.writeText(subjectLine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-background text-foreground min-h-screen w-full flex flex-col relative overflow-hidden">
       <GridBackground />
       <Navbar />
      
      <Section className="py-12 md:py-24 relative z-10">
        <div className="container mx-auto max-w-4xl px-4">

          {/* Header */}
          <div className="mb-12 space-y-4">
            <div className="border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
              <Trash2 className="size-3.5" />
              Data Management
            </div>
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Account Removal
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-12">
            
            {/* 1. General Statement (Exact text requested) */}
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
              <p>
                To be able to provide necessary services within the <strong>Leitner AI</strong> we collect and store various data. You can read about how we process, store and use your data in our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>.
              </p>
              <p>
                To request account removal - please provide your email associated with Leitner AI mobile app following the steps below.
              </p>
            </div>

            {/* 2. Action Grid (Styled like Privacy Policy Cards) */}
            <div className="space-y-6">
              <h2 className="text-foreground text-2xl font-semibold">
                How to delete your account
              </h2>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                
                {/* Step 1: Request Card */}
                <div className="border-border/50 bg-background/50 rounded-2xl border p-6 backdrop-blur-sm flex flex-col h-full">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                      <Mail className="size-5" />
                    </div>
                    <h3 className="text-foreground font-semibold text-lg">1. Send Request</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    Send an email to our support team with the subject line below. Please send this from the email address associated with your account.
                  </p>
                  
                  <div className="space-y-3">
                    {/* Copy Subject Line Box */}
                    <div 
                      onClick={handleCopy}
                      className={cn(
                        "group flex items-center justify-between p-3 rounded-xl border border-dashed border-border/60 bg-background/50 hover:border-primary/30 cursor-pointer transition-all",
                        copied && "border-green-500/50 bg-green-500/5"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Subject Line</p>
                        <p className="text-sm font-medium text-foreground truncate pr-2">{subjectLine}</p>
                      </div>
                      <div className={cn(
                        "size-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        copied ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground group-hover:text-primary"
                      )}>
                        {copied ? <CheckCircle2 className="size-4" /> : <Copy className="size-4" />}
                      </div>
                    </div>

                    <Button asChild size="lg" className="w-full rounded-xl mt-4">
                      <a href={`mailto:${supportEmail}?subject=${encodeURIComponent(subjectLine)}&body=Please delete my account and all associated data.`}>
                        Open Email Client
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Step 2: Processing Card */}
                <div className="border-border/50 bg-background/50 rounded-2xl border p-6 backdrop-blur-sm flex flex-col h-full">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                      <Clock className="size-5" />
                    </div>
                    <h3 className="text-foreground font-semibold text-lg">2. Processing</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Once we receive your request, our team will:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-3 pl-2">
                    <li className="flex gap-2 items-start">
                      <span className="mt-1.5 size-1.5 rounded-full bg-amber-500 shrink-0" />
                      Verify your account ownership to prevent unauthorized deletion.
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="mt-1.5 size-1.5 rounded-full bg-amber-500 shrink-0" />
                      Schedule your data for permanent removal from our servers.
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="mt-1.5 size-1.5 rounded-full bg-amber-500 shrink-0" />
                      Send you a final confirmation email within 7-14 days.
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 3. Important Warning (Styled like Security Section) */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-background border-red-500/20 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border">
                  <AlertTriangle className="text-red-600 dark:text-red-400 size-5" />
                </div>
                <div>
                  <h2 className="text-foreground mb-2 text-xl font-semibold">
                    Important Notice
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Account deletion is <strong>permanent and irreversible</strong>. Once processed:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/50">
                        <Trash2 className="size-4 text-red-500" />
                        All notes will be deleted
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/50">
                        <Trash2 className="size-4 text-red-500" />
                        Subscription will be cancelled
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/50">
                        <Trash2 className="size-4 text-red-500" />
                        Quiz history will be wiped
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/50">
                        <Trash2 className="size-4 text-red-500" />
                        Login will be disabled
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Footer / Contact (Matching Policy Page) */}
            <div className="border-border mt-4 space-y-6 border-t pt-12">
              <div className="bg-primary/5 border-primary/10 rounded-2xl border p-8 text-center">
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  Changed your mind?
                </h3>
                <p className="text-muted-foreground mb-6">
                  You can simply keep your account. No action is required if you decide not to delete it.
                </p>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link href="/">
                    Return to Homepage
                  </Link>
                </Button>
                <p className="text-muted-foreground/60 mt-4 text-xs">
                  Company:{" "}
                  <a
                    href="https://skripe.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary font-medium transition-colors hover:underline"
                  >
                    SKRIPE AZ LLC
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </Section>
      
      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <Footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl mt-auto relative overflow-hidden">
      <Glow 
        variant="bottom" 
        className="pointer-events-none z-0 opacity-60" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <FooterContent>
          <FooterColumn className="col-span-2 sm:col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                 <Shield className="size-4 text-primary" />
              </div>
              <span className="text-lg font-bold">Leitner AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The smartest way to study. Turn any content into interactive quizzes and notes instantly.
            </p>
          </FooterColumn>

          <FooterColumn>
            <h3 className="font-semibold text-foreground">Product</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </FooterColumn>

          <FooterColumn>
            <h3 className="font-semibold text-foreground">Company</h3>
            <a href="https://skripe.com" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Skripe</a>
            <a href="mailto:support@skripe.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </FooterColumn>

          <FooterColumn>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <p>© {new Date().getFullYear()} SKRIPE AZ LLC. All rights reserved.</p>
        </FooterBottom>
      </div>
    </Footer>
  );
}