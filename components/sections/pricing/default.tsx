"use client";

import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

// --- Types ---
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  href: string;
}

// --- Data ---
const plans: Plan[] = [
  {
    id: "weekly",
    name: "Weekly Pass",
    description: "Cramming for finals",
    price: "$10",
    period: "/week",
    buttonText: "Start 7-Day Access",
    href: "/signup?plan=weekly",
    features: [
      { text: "Unlimited notes", included: true },
      { text: "Unlimited videos", included: true },
      { text: "Unlimited quizzes & flashcards", included: true },
      { text: "Quiz notifications", included: true },
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    description: "Semester support",
    price: "$30",
    period: "/mo",
    buttonText: "Get Monthly",
    popular: true,
    href: "/signup?plan=monthly",
    features: [
      { text: "Unlimited notes", included: true },
      { text: "Unlimited videos", included: true },
      { text: "Unlimited quizzes & flashcards", included: true },
      { text: "Quiz notifications", included: true },
    ],
  },
  {
    id: "annual",
    name: "Annual",
    description: "Best value for GPA",
    price: "$229",
    period: "/mo",
    popular: false,
    buttonText: "Start 3-Day Free Trial",
    href: "/signup?plan=annual",
    features: [
      { text: "Unlimited notes", included: true },
      { text: "Unlimited videos", included: true },
      { text: "Unlimited quizzes & flashcards", included: true },
      { text: "Quiz notifications", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <Section className="overflow-hidden py-24">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
            Invest in your grades.
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your study schedule. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        {/* Added 'items-center' to align cards vertically in the center */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-[32px] border transition-all duration-300",
                "bg-background/60 backdrop-blur-xl",
                // Popular card gets more padding (py-12) vs standard (py-8)
                plan.popular 
                  ? "py-12 px-8 border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/20 z-10" 
                  : "py-8 px-8 border-border/50 shadow-sm hover:shadow-md hover:border-border/80 z-0"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
                   <Badge className="bg-primary hover:bg-primary text-primary-foreground px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Sparkles className="size-3.5 fill-pink-500 text-pink-500" />
                      Most Popular
                   </Badge>
                </div>
              )}

              {/* Card Header - Centered for balance */}
              <div className="mb-8 text-center space-y-2">
                <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground font-medium">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground/80">
                  {plan.description}
                </p>
              </div>

              {/* Features List - Left Aligned for readability */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <div className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                      feature.included 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground/50"
                    )}>
                      {feature.included ? (
                        <Check className="size-3" />
                      ) : (
                        <div className="size-1 rounded-full bg-current" />
                      )}
                    </div>
                    <span className={cn(
                      feature.included ? "text-foreground" : "text-muted-foreground/60"
                    )}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  asChild
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  className={cn(
                    "w-full rounded-2xl h-12 text-base font-medium transition-all",
                    plan.popular && "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                  )}
                >
                  <a href={plan.href}>{plan.buttonText}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include access to the iOS and Android apps.
            <br className="hidden sm:inline" />{" "}
            Need help? Read <a href="#" className="underline hover:text-foreground">Terms & condiitons</a>.
          </p>
        </div>
        
      </div>
    </Section>
  );
}