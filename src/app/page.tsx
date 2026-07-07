import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Clients from "@/components/Clients";
import Products from "@/components/Products";
import Lifestyle from "@/components/Lifestyle";
import FeatureReel from "@/components/FeatureReel";
import Ecosystem from "@/components/Ecosystem";
import SmartLock from "@/components/SmartLock";
import Scenes from "@/components/Scenes";
import AppShowcase from "@/components/AppShowcase";
import Stats from "@/components/Stats";
import Why from "@/components/Why";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <Clients />
      <Products />
      <Lifestyle />
      <FeatureReel />
      <Ecosystem />
      <SmartLock />
      <Scenes />
      <AppShowcase />
      <Stats />
      <Why />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
