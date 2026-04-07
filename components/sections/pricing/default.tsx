"use client";

import { Check, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

// --- Pricing Data Sources ---
export const PRICING_TIERS_CLAIM = [
  {
    key: "weekly",
    id: "pro_weekly",
    unit: "week",
    name: "Weekly",
    claimOffer: "Free first week",
    defaultPrice: 5.99,
    originalPrice: 0,
    description: "Perfect for short-term projects.",
    discountId: "dsc_01kn732qx3f2tk2pdpvjj2dav5",
    priceId: "pri_01kn72e7s269tnzcakpvf9fvs5", 
    features: ['Unlimited notes', 'AI Chat', 'Unlimited quizzes & flashcards', 'Quiz notifications'],
  },
  {
    key: "monthly",
    id: "pro_monthly",
    unit: "month",
    name: "Monthly",
    claimOffer: "+42% discount",
    defaultPrice: 11.99,
    originalPrice: 6.99,
    discount: "50% OFF",
    description: "Recommended for ongoing usage.",
    discountId: 'dsc_01kn733smjmmk9y4qhyhymvrfe',
    priceId: "pri_01kn72r9q9rxq8sa54n4xe51w6", 
    features: ['Unlimited notes', 'AI Chat', 'Unlimited quizzes & flashcards', 'Quiz notifications'],
    isPopular: true, // Helper flag for default selection
  },
  {
    key: "annual",
    id: "pro_annual",
    unit: "month",
    name: "Annual",
    defaultPrice: 79.99,
    originalPrice: 65.89, //239 dan endirime claimsiz gelende
    discount: "80% OFF",
    claimOffer: "+2 month free",
    montly_price: 65.89,
    discountId: 'dsc_01kjt7062j64y950pwkfxttr8s',
    priceId: "pri_01kn72whp6q7grp3jhzadkhnny",
    description: "Best value. Save significantly.",
    features: ['Unlimited notes', 'AI Chat', 'Unlimited quizzes & flashcards', 'Quiz notifications'],
  },
];


export const PRICING_TIERS = [
  {
    key: "weekly",
    id: "pro_weekly",
    unit: "week",
    name: "Weekly",
    originalPrice: 5.99,
    description: "Perfect for short-term projects.",
    priceId: "pri_01kn72e7s269tnzcakpvf9fvs5", 
    features: ['Unlimited notes', 'AI Chat', 'Unlimited quizzes & flashcards', 'Quiz notifications'],
  },
  {
    key: "monthly",
    unit: "month",
    id: "pro_monthly",
    name: "Monthly",
    defaultPrice: 34.99,
    originalPrice: 11.99,
    discountId: 'dsc_01kn728x05nvebcaadtwavjyjv',
    discount: "50% OFF",
    description: "Recommended for ongoing usage.",
    priceId: "pri_01kn72g7y1k1was8fy04fnk5pr", 
    features: ['Unlimited notes', 'AI Chat', 'Unlimited quizzes & flashcards', 'Quiz notifications'],
    isPopular: true, // Helper flag for default selection
  },
  {
    key: "annual",
    id: "pro_annual",
    name: "Annual",
    unit: "month",
    defaultPrice: 239.99,
    originalPrice: 79.99, //239 dan endirime claimsiz gelende
    discount: "80% OFF",
    discountId: 'dsc_01kn7312xn4mas8fn4bbybkadp',
    description: "Best value. Save significantly.",
    priceId: "pri_01kn72nntvwtbx9fxpjq1sjyh2",
    features: ['Unlimited notes', 'AI Chat', 'Unlimited quizzes & flashcards', 'Quiz notifications'],
  },
];

export default function Pricing({ banner }: { banner?: any }) {
  const [livePrices, setLivePrices] = useState<Record<string, { current: number; original: number | null }>>({});
  const [isLoading, setIsLoading] = useState(true);

  // 1. Determine which data set to use based on the promo banner
  const hasPromo = !!banner;
  const activeTiers = hasPromo ? PRICING_TIERS_CLAIM : PRICING_TIERS;

  useEffect(() => {
    let paddleInstance: Paddle | undefined;

    const fetchPrices = async () => {
      try {
        paddleInstance = await initializePaddle({
          environment: "production",
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "test_token",
        });

        if (paddleInstance) {
          const request = {
            items: activeTiers.map((p) => ({ priceId: p.priceId, quantity: 1 })),
          };

          const preview = await paddleInstance.PricePreview(request);
          const priceMap: Record<string, { current: number; original: number | null }> = {};

          preview.data.details.lineItems.forEach((item) => {
            const plan = activeTiers.find((p) => p.priceId === item.price.id);
            if (plan) {
              const currentNum = parseInt(item.formattedTotals.total.replace(/[^0-9]/g, ""), 10) / 100;
              const subtotalNum = parseInt(item.formattedTotals.subtotal.replace(/[^0-9]/g, ""), 10) / 100;
              
              priceMap[plan.key] = {
                current: currentNum,
                original: subtotalNum !== currentNum ? subtotalNum : null,
              };
            }
          });

          setLivePrices(priceMap);
        }
      } catch (error) {
        console.error("Failed to fetch Paddle prices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, [hasPromo, activeTiers]);

  // Helper to map buttons back to your old text style
  const getButtonText = (key: string, hasPromo?: boolean) => {
    console.log("Determining button text for:", key, hasPromo);
    if (key === "weekly") return "Start 7-Day Access";
    if (key === "monthly") return "Get Monthly";
    if (key === "annual") return "Get Annual Plan";
    return "Start 3-Day Free Trial";
  };

  return (
    <Section className="overflow-hidden py-24">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-6" id="pricing">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
            Invest in your grades.
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your study schedule. Cancel anytime.
          </p>
        </div>
        
        {/* Banner */}
        {banner}

        {/* Pricing Cards Grid (Old Style Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center mt-8">
          {activeTiers.map((tier) => {
            
            // Highlight Logic: We highlight Annual if promo is active, else fallback to tier.isPopular
            const isSelected = hasPromo ? tier.key === "annual" : tier.isPopular;
            
            // Base Prices from Data
            let finalOriginal = tier.originalPrice;
            let finalDefault = tier.defaultPrice;

            // Override with Live Paddle Prices if available
            if (livePrices[tier.key]) {
              finalOriginal = livePrices[tier.key].current;
              if (livePrices[tier.key].original) {
                 finalDefault = livePrices[tier.key].original;
              }
            }

            return (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-[32px] border transition-all duration-300",
                  "bg-background/60 backdrop-blur-xl h-full",
                  isSelected 
                    ? "py-12 px-8 border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/20 z-10" 
                    : "py-8 px-8 border-border/50 shadow-sm hover:shadow-md hover:border-border/80 z-0"
                )}
              >
                {/* Top Badge (Old Style) */}
                {isSelected && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
                    <Badge className="bg-primary hover:bg-primary text-primary-foreground px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      {(tier as any).claimOffer ? (
                        <>🎁 {(tier as any).claimOffer}</>
                      ) : (
                        <>
                          <Sparkles className="size-3.5 fill-pink-500 text-pink-500" />
                          Most Popular
                        </>
                      )}
                    </Badge>
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-8 text-center flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {tier.name}
                  </h3>
                  
                  {/* --- PRICE DISPLAY SECTION (With SaaS Line-through) --- */}
                  <div className="flex flex-col items-center justify-center min-h-[5rem]">
                    
                    {/* Strike-through Price */}
                    {finalDefault !== null && finalDefault !== undefined && (
                      <span className="text-sm font-medium line-through text-foreground decoration-1 opacity-70 mb-[-4px]">
                        ${tier.key === "annual" ? (finalDefault / 12).toFixed(2) : finalDefault.toFixed(2)}
                      </span>
                    )}
                    
                    {/* Main Price */}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={cn(
                        "text-4xl font-bold tracking-tight text-foreground",
                        isSelected && "text-pink-500" // Optional: makes the selected price pop
                      )}>
                        ${tier.key === "annual" ? (finalOriginal / 12).toFixed(2) : finalOriginal.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        /{tier.unit}
                      </span>
                    </div>

                    {/* Billed Annually Subtext */}
                    {tier.key === "annual" && (
                      <span className="text-xs text-muted-foreground mt-1">
                        Billed annually (${finalOriginal.toFixed(2)}/yr)
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-muted-foreground/80 mt-2">
                    {tier.description}
                  </p>
                </div>

                {/* Features List (Old Style Layout) */}
                <ul className="mb-8 space-y-4">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                        "bg-primary/10 text-primary" // Assuming all features are included in your data
                      )}>
                        <Check className="size-3" />
                      </div>
                      <span className="text-foreground leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button (Old Style) */}
                <div className="mt-auto">
                  <Button
                    asChild
                    size="lg"
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "w-full rounded-2xl h-12 text-base font-medium transition-all",
                      isSelected && "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                    )}
                  >
                    <a href={`https://app.bycat.ai/price-page`}>
                      {isLoading && isSelected ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                      {getButtonText(tier.key, hasPromo)}
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include access to the iOS and Android apps.
            <br className="hidden sm:inline" />{" "}
            Need help? Read <a href="#" className="underline hover:text-foreground">Terms & conditions</a>.
          </p>
        </div>
        
      </div>
    </Section>
  );
}