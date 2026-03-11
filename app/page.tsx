import Banner from "@/components/ui/banner";
import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Logos from "../components/sections/logos/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Stats from "../components/sections/stats/default";
import GridBackground from "../components/ui/grid-background";

export default async function Home() {


   let activePromo = null;
  try {
    // Replace the URL with your actual API base URL. 
    // Server fetches require absolute URLs.
    const apiUrl ='https://api.lessnote.ai';
    const res = await fetch(`${apiUrl}/auth/promo/active`, { 
      cache: 'no-store' // Ensures it fetches fresh data every time
    });
    if (res.ok) {
      activePromo = await res.json();
      console.log("Active Promo:", activePromo);
    }
  } catch (error) {
    console.error("Failed to fetch promo:", error);
  }


  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <GridBackground />
      <Navbar />
      {
        activePromo?.has_promo && (
            <div className="relative z-50 w-full flex justify-center mt-4 mb-4 md:-mb-12 px-4">
              <Banner promoData={{ claim_until: activePromo.claim_until }} />
            </div>
        )
      }
      <Hero />
      <Logos />
      <Items />
      <Stats />
      <Pricing banner={activePromo?.has_promo ? (<Banner promoData={{ claim_until: activePromo.claim_until }} />) : null} />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
