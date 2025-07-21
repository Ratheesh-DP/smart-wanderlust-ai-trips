import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { Destinations } from "@/components/sections/Destinations"
import { Features } from "@/components/sections/Features"
import { AIPlanner } from "@/components/sections/AIPlanner"
import { Footer } from "@/components/sections/Footer"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Features />
        <AIPlanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
