import AboutSection1 from "@/components/ui/about-section-1";
import { CircularGallerySection } from "@/components/ui/circular-gallery-section";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { Section1 } from "@/components/ui/section-1";
import { ServicesSection } from "@/components/ui/services-section";
import { SocialFollowSection } from "@/components/ui/social-follow-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

export function HomePage() {
  return (
    <main className="relative z-10">
      <SiteNavbar absolute />
      <Section1 />
      <ServicesSection />
      <TestimonialsSection />
      <CircularGallerySection />
      <AboutSection1 />
      <SocialFollowSection />
      <FooterTapedDesign />
    </main>
  );
}
