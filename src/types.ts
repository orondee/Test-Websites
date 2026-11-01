export type BusinessIndustry = 
  | 'all'
  | 'hospitality'
  | 'healthcare'
  | 'creative'
  | 'saas'
  | 'legal';

export interface DemoProject {
  id: string;
  name: string;
  industry: BusinessIndustry;
  industryLabel: string;
  tagline: string;
  description: string;
  clientType: string;
  heroImage: string;
  startingPrice: string;
  turnaroundTime: string;
  conversionFeatures: string[];
  techStack: string[];
  resultsStat: {
    label: string;
    value: string;
  };
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile' | 'fullscreen';

export interface CalculatorState {
  websiteType: 'starter' | 'business' | 'ecommerce' | 'saas' | 'bespoke';
  pagesCount: number;
  cmsIntegration: boolean;
  onlineBooking: boolean;
  ecommerceStore: boolean;
  seoOptimization: boolean;
  speedOptimization: boolean;
  customAnimations: boolean;
  rushDelivery: boolean;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  companyName: string;
  industry: string;
  selectedDemoId?: string;
  packageType: string;
  estimatedBudget: string;
  timeline: string;
  projectBrief: string;
}
