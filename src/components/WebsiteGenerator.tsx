import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, ExternalLink, Download, RotateCcw, Wand2, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

interface WebsiteGeneratorProps {
  selectedTemplate?: string;
  onTemplateChange: () => void;
}

interface GenerationProgress {
  step: number;
  message: string;
  progress: number;
}

interface GeneratedWebsite {
  id: number;
  name: string;
  previewUrl: string;
  downloadUrl: string;
}

export function WebsiteGenerator({ selectedTemplate, onTemplateChange }: WebsiteGeneratorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress>({ step: 0, message: "", progress: 0 });
  const [generatedWebsite, setGeneratedWebsite] = useState<GeneratedWebsite | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    contactEmail: "",
    phone: "",
    address: "",
    colorScheme: "professional"
  });

  const templateNames: Record<string, string> = {
    business: "Business Template",
    minimalist: "Minimalist Template", 
    crypto: "Crypto Template",
    ecommerce: "E-commerce Template",
    chat: "Chat Template"
  };

  const progressSteps = [
    { progress: 20, message: "Analyzing your requirements..." },
    { progress: 40, message: "Selecting optimal template..." },
    { progress: 60, message: "Generating custom content..." },
    { progress: 80, message: "Applying your brand colors..." },
    { progress: 100, message: "Finalizing your website..." }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const simulateProgress = (): Promise<void> => {
    return new Promise((resolve) => {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setGenerationProgress({
            step: currentStep + 1,
            message: progressSteps[currentStep].message,
            progress: progressSteps[currentStep].progress
          });
          currentStep++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate a website.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTemplate) {
      toast({
        title: "Template Required",
        description: "Please select a template first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress({ step: 0, message: "Starting generation...", progress: 0 });

    try {
      // Simulate progress
      await simulateProgress();

      // Generate website
      const websiteData = {
        template: selectedTemplate,
        businessName: formData.businessName,
        description: formData.description,
        contactEmail: formData.contactEmail,
        phone: formData.phone,
        address: formData.address,
        colorScheme: formData.colorScheme,
        userId: user?.id || 1,
        name: `${formData.businessName} Website`
      };

      const response = await apiRequest("POST", "/api/websites/generate", websiteData);
      const website = await response.json();

      if (website && website.id) {
        setGeneratedWebsite({
          id: website.id,
          name: website.name,
          previewUrl: `/api/websites/${website.id}/preview`,
          downloadUrl: `/api/websites/${website.id}/download`
        });
        setShowPreview(true);
      } else {
        throw new Error("Invalid response from server");
      }

      toast({
        title: "Website Generated!",
        description: "Your website has been successfully created.",
      });
    } catch (error) {
      console.error("Generation failed:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your website. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewWebsite = () => {
    if (generatedWebsite?.previewUrl) {
      window.open(generatedWebsite.previewUrl, '_blank');
    }
  };

  const handleDownload = async () => {
    if (generatedWebsite?.downloadUrl) {
      try {
        const response = await fetch(generatedWebsite.downloadUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.businessName || 'website'}-source.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        toast({
          title: "Download Failed",
          description: "There was an error downloading your website source code.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <>
      <section className="py-10 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader className="text-center px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Generate Your Website</CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Describe your website requirements and watch as AI creates your perfect site in minutes.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
              {selectedTemplate && (
                <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 text-sm sm:text-base">Selected Template: </span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs sm:text-sm">
                          {templateNames[selectedTemplate]}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onTemplateChange} className="w-full sm:w-auto">
                      Change
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business/Website Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="Enter your business or website name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Website Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what your website should include, your services, target audience, and any specific requirements..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Business Address (Optional)</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Your business address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="colorScheme">Preferred Color Scheme</Label>
                    <Select value={formData.colorScheme} onValueChange={(value) => handleInputChange("colorScheme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional (Blue & Gray)</SelectItem>
                        <SelectItem value="modern">Modern (Purple & White)</SelectItem>
                        <SelectItem value="vibrant">Vibrant (Orange & Teal)</SelectItem>
                        <SelectItem value="elegant">Elegant (Black & Gold)</SelectItem>
                        <SelectItem value="natural">Natural (Green & Brown)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    type="submit" 
                    disabled={isGenerating || !selectedTemplate}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 px-6 font-semibold transform hover:scale-105 shadow-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Website
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" className="px-6 py-4">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Template
                  </Button>
                </div>
              </form>

              {isGenerating && (
                <div className="mt-8 text-center space-y-4">
                  <div className="inline-flex items-center space-x-3 text-primary">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="font-medium">Generating your website...</span>
                  </div>
                  <div className="max-w-md mx-auto">
                    <Progress value={generationProgress.progress} className="mb-2" />
                    <div className="text-sm text-gray-500">{generationProgress.message}</div>
                  </div>
                  <div className="text-sm text-gray-500">This usually takes 30-60 seconds</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">Your Website is Ready!</DialogTitle>
            <DialogDescription>
              Preview your generated website and download the source code when you're satisfied.
            </DialogDescription>
          </DialogHeader>

          {generatedWebsite && (
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-xl p-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">
                        {generatedWebsite.previewUrl}
                      </div>
                    </div>
                  </div>
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {formData.businessName} - Live Preview
                      </h3>
                      <p className="text-gray-600">Your website has been generated successfully</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleViewWebsite} className="bg-primary hover:bg-primary/90 text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Website
                </Button>
                <Button onClick={handleDownload} className="bg-secondary hover:bg-secondary/90 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Source Code
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Generate Another
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
