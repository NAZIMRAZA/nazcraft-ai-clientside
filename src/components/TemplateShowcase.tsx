import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Feather, Bitcoin, ShoppingCart, MessageCircle, Plus } from "lucide-react";

const templates = [
  {
    id: "business",
    name: "Business Template",
    description: "Professional corporate websites with contact forms, service pages, and portfolio sections.",
    icon: Building,
    color: "bg-blue-500",
    tags: ["Corporate", "Professional", "Services"],
    popular: true
  },
  {
    id: "minimalist",
    name: "Minimalist Template", 
    description: "Clean, elegant designs perfect for portfolios, resumes, and personal websites.",
    icon: Feather,
    color: "bg-gray-500",
    tags: ["Clean", "Portfolio", "Resume"]
  },
  {
    id: "crypto",
    name: "Crypto Template",
    description: "Cryptocurrency platforms with calculators, policies, and trading interfaces.",
    icon: Bitcoin,
    color: "bg-yellow-500",
    tags: ["Crypto", "Calculator", "Trading"]
  },
  {
    id: "ecommerce",
    name: "E-commerce Template",
    description: "Full-featured online stores with product catalogs, shopping carts, and admin panels.",
    icon: ShoppingCart,
    color: "bg-green-500",
    tags: ["Store", "Shopping", "Admin"]
  },
  {
    id: "chat",
    name: "Chat Template",
    description: "Real-time messaging platforms with user authentication and admin management.",
    icon: MessageCircle,
    color: "bg-purple-500",
    tags: ["Messaging", "Real-time", "Social"]
  }
];

interface TemplateShowcaseProps {
  onTemplateSelect: (templateId: string) => void;
  selectedTemplate?: string;
}

export function TemplateShowcase({ onTemplateSelect, selectedTemplate }: TemplateShowcaseProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Select from our professionally designed templates, customize with AI, and get your website ready in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => {
            const IconComponent = template.icon;
            const isSelected = selectedTemplate === template.id;
            const isHovered = hoveredTemplate === template.id;
            
            return (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-xl'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => onTemplateSelect(template.id)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-full h-48 ${template.color} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <IconComponent className="h-16 w-16 text-white" />
                    {(isHovered || isSelected) && (
                      <div className="absolute inset-0 bg-white opacity-10 transition-opacity"></div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    {template.popular && (
                      <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 text-slate-600">
                    {template.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className={`w-full transition-colors ${
                      isSelected 
                        ? 'bg-primary text-white' 
                        : 'bg-primary hover:bg-primary/90 text-white'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Template'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-all duration-300 cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-full mb-4 flex items-center justify-center">
                <Plus className="h-8 w-8 text-slate-400" />
              </div>
              <CardTitle className="text-xl mb-2">Custom Template</CardTitle>
              <CardDescription className="mb-4">
                Need something unique? Describe your requirements and our AI will create a custom template for you.
              </CardDescription>
              <Button variant="outline" className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white">
                Request Custom
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
