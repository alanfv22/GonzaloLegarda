import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventosSection from "@/components/EventosSection";
import WhyUs from "@/components/WhyUs";
import CtaFinal from "@/components/CtaFinal";
import MenuShabatPlaceholder from "@/components/MenuShabatPlaceholder";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import ConsultaModal from "@/components/ConsultaModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventosSection />
        <WhyUs />
        <CtaFinal />
        <MenuShabatPlaceholder />
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsultaModal />
    </>
  );
}
