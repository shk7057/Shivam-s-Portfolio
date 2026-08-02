import { AboutSection } from "@/components/sections/about-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HomeSection } from "@/components/sections/home-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { HorizontalScroll } from "@/components/scroll/horizontal-scroll";
import { ServicesSection } from "@/components/sections/services-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function HomePage() {
  return (
    <HorizontalScroll>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ServicesSection />
      <CertificatesSection />
      <ContactSection />
    </HorizontalScroll>
  );
}
