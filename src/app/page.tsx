import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Clients from "@/components/Clients";
import Products from "@/components/Products";
import Defer from "@/components/Defer";
import {
  LazyLifestyle,
  LazyFeatureReel,
  LazySmartLock,
  LazyScenes,
  LazyAppShowcase,
  LazyGallery,
} from "@/components/lazy";
import Ecosystem from "@/components/Ecosystem";
import Stats from "@/components/Stats";
import Why from "@/components/Why";
import MoreFromAaroTec from "@/components/MoreFromAaroTec";
import Testimonials from "@/components/Testimonials";
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
      <Defer minHeight="70vh"><LazyLifestyle /></Defer>
      <Defer minHeight="80vh"><LazyFeatureReel /></Defer>
      <Ecosystem />
      <Defer id="smart-lock" minHeight="80vh"><LazySmartLock /></Defer>
      <Defer minHeight="90vh"><LazyScenes /></Defer>
      <Defer minHeight="70vh"><LazyAppShowcase /></Defer>
      <Stats />
      <Why />
      <Defer id="gallery" minHeight="90vh"><LazyGallery /></Defer>
      <MoreFromAaroTec />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
