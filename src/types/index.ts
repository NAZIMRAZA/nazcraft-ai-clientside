export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  firebaseUid: string;
  emailVerified: boolean;
  createdAt?: Date;
}

export interface Website {
  id: number;
  userId?: number;
  name: string;
  template: string;
  description: string;
  businessName: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  colorScheme?: string;
  generatedHtml?: string;
  generatedCss?: string;
  generatedJs?: string;
  previewUrl?: string;
  downloadUrl?: string;
  createdAt?: Date;
}

export interface ContactMessage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  generateHtml: (data: any) => string;
  generateCss: (data: any) => string;
  generateJs: (data: any) => string;
}
