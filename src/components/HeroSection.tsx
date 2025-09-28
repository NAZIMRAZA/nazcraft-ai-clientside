import { Button } from "@/components/ui/button";
import { Rocket, Play, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const handleScrollToServices = () => {
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary/5 via-white to-slate-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Build Stunning Websites with 
              <span className="text-primary block">AI-Powered</span> 
              Simplicity
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Transform your ideas into professional websites in minutes. Just describe what you want, choose a template, and watch our AI craft your perfect website.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleScrollToServices}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Building Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-4 text-lg font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                No coding required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Instant deployment
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Source code included
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 text-center text-sm text-slate-500">Nazcraft Builder</div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">Describe your website</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Step 1/3</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="h-2 bg-slate-200 rounded mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-primary/30 rounded w-1/2"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                        <div className="text-xs text-slate-600">Business</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                        <div className="text-xs text-slate-600">Minimal</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2"></div>
                        <div className="text-xs text-slate-600">E-commerce</div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary text-white py-2 text-sm font-medium">
                      Generate Website
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
