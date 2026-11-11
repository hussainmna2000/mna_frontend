export interface Project {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  location: string;
  city: string;
  priceStarting: string;
  priceNumeric: number;
  status: 'Upcoming' | 'Under Construction' | 'Ready to Move';
  type: '1 BHK Individual House' | '2 BHK Individual House' | 'Customized Type' | 'Land';
  bedrooms: string;
  carpetArea: string;
  possessionDate: string;
  completionPercentage: number;
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  reraId: string;
  architect: string;
  description: string;
  highlights: string[];
  amenities: { name: string; icon: string }[];
  floorPlans: {
    title: string;
    bhk: string;
    area: string;
    image: string;
    price: string;
    specs: string[];
  }[];
  nearbyLandmarks: { name: string; category: 'School' | 'Hospital' | string; distance: string }[];
  constructionMilestones: { stage: string; percentage: number; description: string; date: string }[];
}


export interface Testimonial {
  id: string;
  name: string;
  role: string;
  projectPurchased: string;
  rating: number;
  avatar: string;
  review: string;
  videoUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Exterior Architecture' | 'Interior Design' | 'Amenities' | 'Drone Views' | 'Construction Updates';
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  projectRef?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract';
  experience: string;
  description: string;
  requirements: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking & Payments' | 'Construction & Timelines' | 'Loans & Finance' | 'Handover & Legal' | 'Customization';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

export interface ConstructionStage {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  percentage: number;
}

export interface SiteTimelineUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SitePhoto {
  id: string;
  title: string;
  date: string;
  url: string;
  category: string;
}

export interface ClientDocumentItem {
  id: string;
  title: string;
  type: 'Agreement' | 'Floor Plan' | 'Payment Receipts' | 'Warranty' | 'Brochure';
  fileSize: string;
  date: string;
}

export interface ClientPaymentDetails {
  totalCost: string;
  paidAmount: string;
  pendingAmount: string;
  nextInstallmentAmount: string;
  nextInstallmentDate: string;
  paymentStatus: 'Up to Date' | 'Pending' | 'Overdue';
  percentagePaid: number;
}

export interface ClientNotification {
  id: string;
  title: string;
  time: string;
  type: 'update' | 'photo' | 'visit' | 'payment';
  read: boolean;
}

export interface ClientProfile {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  projectName: string;
  houseNumber: string;
  purchasedProperty: string;
  bookingDate: string;
  overallProgress: number;
  estimatedCompletion: string;
  remainingDays: number;
  currentPhase: string;
  projectStatusBadge: string;
  stages: ConstructionStage[];
  timeline: SiteTimelineUpdate[];
  photos: SitePhoto[];
  documents: ClientDocumentItem[];
  payment: ClientPaymentDetails;
  notifications: ClientNotification[];
}
