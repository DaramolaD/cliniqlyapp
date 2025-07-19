import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Features from "@/components/sections/Features";
import Testimonial from "@/components/sections/Testimonial";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import StickyButton from "@/components/sections/StickyButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <Testimonial />
      <Pricing />
      <FAQ />
      <Footer />
      <StickyButton />
    </div>
  );
}
