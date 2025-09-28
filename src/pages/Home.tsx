import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TemplateShowcase } from "@/components/TemplateShowcase";
import { WebsiteGenerator } from "@/components/WebsiteGenerator";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const handleSignInClick = () => {
    setAuthMode("signin");
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Scroll to generator section
    setTimeout(() => {
      const generatorSection = document.querySelector('.py-20.bg-gray-50');
      if (generatorSection) {
        generatorSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTemplateChange = () => {
    // Scroll back to template selection
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      
      <HeroSection onGetStarted={handleSignUpClick} />
      
      <AboutSection />
      
      <TemplateShowcase 
        onTemplateSelect={handleTemplateSelect}
        selectedTemplate={selectedTemplate}
      />
      
      <WebsiteGenerator 
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
      />
      
      <ContactSection />
      
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-primary">Nazcraft</span>
                <span className="text-sm font-medium text-slate-400 ml-1">by Nazcorp</span>
              </h3>
              <p className="text-slate-400 mb-4">
                Empowering businesses with AI-driven website creation. Build, deploy, and scale your online presence effortlessly.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Nazcraft by Nazcorp. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
