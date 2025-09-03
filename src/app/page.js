import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceFeatures from "@/components/ServiceFeatures";
import ProductsSection from "@/components/ProductsSection";
import AboutUsSection from "@/components/AboutUsSection";
import CallbackRequestSection from "@/components/CallbackRequestSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <section id="home">
        <HeroSection />
      </section>
      <section id="services">
        <ServiceFeatures />
      </section>
      <section id="products">
        <ProductsSection />
      </section>
      <section id="about">
        <AboutUsSection />
      </section>
      <section id="contact">
        <CallbackRequestSection />
      </section>
      <Footer />
    </main>
  );
}
