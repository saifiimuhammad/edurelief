import FeatureSection from "@/components/home/FeatureSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HoyItWorks";
import SDGSection from "@/components/home/SDGSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default async function HomePage() {
  

  return (
    <>

    {/* Navbar vcomponent */}
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Students */}
       <FeatureSection />

        {/* How It Works */}
        <HowItWorks />

        {/* SDG Section */}
        <SDGSection />
      </main>
      <Footer />
    </>
  );
}
