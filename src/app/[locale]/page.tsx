import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import GroomingPackages from "@/components/GroomingPackages";
import GroomingAddOns from "@/components/GroomingAddOns";
import Testimonials from "@/components/Testimonials";
import AreasWeServe from "@/components/AreasWeServe";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <GroomingPackages />
        <GroomingAddOns />
        <Testimonials />
        <AreasWeServe />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
