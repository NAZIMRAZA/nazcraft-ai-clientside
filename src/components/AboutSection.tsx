import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Code, Shield, Users, CheckCircle } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Our advanced AI understands your business needs and creates tailored websites that perfectly match your vision.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional websites in minutes, not weeks. Deploy instantly with optimized performance.",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Code,
      title: "Full Code Access",
      description: "Download complete source code. No vendor lock-in, complete ownership, endless customization possibilities.",
      color: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { value: "10K+", label: "Websites Created" },
    { value: "4.9/5", label: "Customer Rating" },
    { value: "5min", label: "Avg. Build Time" },
    { value: "24/7", label: "Support Available" }
  ];

  const benefits = [
    "99.9% uptime guarantee",
    "24/7 customer support", 
    "Enterprise-grade security",
    "Money-back guarantee"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Why Choose Nazcraft?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with proven design principles to deliver websites that not only look amazing but perform exceptionally.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mx-auto mb-6 flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-primary/5 rounded-3xl p-8 lg:p-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-6">
                Trusted by 10,000+ Businesses Worldwide
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 shadow-lg">
                    <CardContent className="p-0">
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
