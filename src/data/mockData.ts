import { Project, Testimonial, GalleryItem, JobOpening, FAQItem, TeamMember } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'mna-1bhk-individual-house',
    title: '1 BHK Individual House',
    tagline: 'Smart Modern Independent Home in Padiyur',
    slug: '1-bhk-individual-house',
    location: 'Padiyur Junction, Ottapalayam',
    city: 'PADIYUR OTTAPALAYAM',
    priceStarting: '₹ 16 Lakhs onwards',
    priceNumeric: 1600000,
    status: 'Under Construction',
    type: '1 BHK Individual House',
    bedrooms: '1 BHK',
    carpetArea: '750 - 950 Sq.Ft.',
    possessionDate: 'Q3 2026',
    completionPercentage: 60,
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80'
    ],
    reraId: 'K-RERA/PRJ/OTP/2025/101',
    architect: 'MNA Architectural Team',
    description: 'Smart, independent 1 BHK individual house constructed with premium quality materials, vaastu compliance, private portico, and eco-friendly features in Padiyur Ottapalayam.',
    highlights: [
      'Independent Single Storey Layout',
      'Private Covered Parking Portico',
      'Clear Title & Bank Loan Approved',
      'Solar Water Heater & Rainwater Harvesting'
    ],
    amenities: [
      { name: 'Private Garden Space', icon: 'TreePine' },
      { name: '24/7 Water Supply', icon: 'Waves' },
      { name: 'Gated Security Patrol', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        title: '1 BHK Standard Layout',
        bhk: '1 BHK',
        area: '800 Sq.Ft.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        price: '₹ 16 Lakhs onwards',
        specs: ['1 En-suite Master Bedroom', 'Spacious Living Room', 'Modular Kitchen', '1 Bathroom', 'Front Verandah']
      }
    ],
    nearbyLandmarks: [
      { name: 'NSS College & Higher Secondary School', category: 'School', distance: '5 Mins' },
      { name: 'Padiyur Government School', category: 'School', distance: '3 Mins' }
    ],
    constructionMilestones: [
      { stage: 'Foundation & RCC Pillars', percentage: 100, description: 'Structure pillars complete.', date: 'Jan 2026' },
      { stage: 'Brickwork & Roof Slab', percentage: 70, description: 'Brickwork underway.', date: 'In Progress' }
    ]
  },
  {
    id: 'mna-2bhk-individual-house',
    title: '2 BHK Individual House',
    tagline: 'Spacious Independent Family Residence',
    slug: '2-bhk-individual-house',
    location: 'Green Hill Vista, Padiyur',
    city: 'PADIYUR OTTAPALAYAM',
    priceStarting: '₹ 23 Lakhs onwards',
    priceNumeric: 2300000,
    status: 'Under Construction',
    type: '2 BHK Individual House',
    bedrooms: '2 BHK',
    carpetArea: '1,250 - 1,650 Sq.Ft.',
    possessionDate: 'Q4 2026',
    completionPercentage: 70,
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    reraId: 'K-RERA/PRJ/OTP/2025/102',
    architect: 'MNA Structural Team',
    description: 'Elegant 2 BHK independent individual house with spacious rooms, open terrace access, compound wall with iron gate, and modern fittings in Padiyur Ottapalayam.',
    highlights: [
      'Spacious 2 En-suite Bedrooms',
      'Private Terrace Staircase',
      'Compound Wall with Iron Gate',
      'High Quality Teak & Granite Finishes'
    ],
    amenities: [
      { name: 'Private Car Parking', icon: 'Car' },
      { name: 'Solar Energy Ready', icon: 'Zap' },
      { name: '24/7 CCTV Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        title: '2 BHK Deluxe Plan',
        bhk: '2 BHK',
        area: '1,450 Sq.Ft.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        price: '₹ 23 Lakhs onwards',
        specs: ['2 Master Bedrooms', 'Large Family Living & Dining', '2 Bathrooms', 'Utility Space', 'Balcony / Verandah']
      }
    ],
    nearbyLandmarks: [
      { name: 'Ottapalam Government Taluk Hospital', category: 'Hospital', distance: '8 Mins' },
      { name: 'Padiyur Central School', category: 'School', distance: '4 Mins' }
    ],
    constructionMilestones: [
      { stage: 'Superstructure & Roofing', percentage: 100, description: 'Roof slab poured successfully.', date: 'Feb 2026' },
      { stage: 'Plastering & Electrical Rough-in', percentage: 65, description: 'Internal plastering ongoing.', date: 'In Progress' }
    ]
  },
  {
    id: 'mna-customized-type',
    title: 'Customized Type Individual House',
    tagline: 'Bespoke Custom Villa & Home Construction Built to Your Specification',
    slug: 'customized-type',
    location: 'Padiyur Main Road, Ottapalayam',
    city: 'PADIYUR OTTAPALAYAM',
    priceStarting: 'Get Quote for Requirements',
    priceNumeric: 0,
    status: 'Under Construction',
    type: 'Customized Type',
    bedrooms: '2+ BHK',
    carpetArea: '1,800 - 4,000 Sq.Ft.',
    possessionDate: 'Q1 2027',
    completionPercentage: 45,
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    reraId: 'K-RERA/PRJ/OTP/2025/103',
    architect: 'MNA Custom Design Studio',
    description: 'Tailor-made customized house construction service where floor plans, interior elevations, bedroom counts, material selection, and exterior themes are custom-built to your family requirements in Padiyur Ottapalayam.',
    highlights: [
      '100% Customized Architectural Floor Plan',
      'Choice of Premium Materials & Finishes',
      'Dedicated Architect & Site Manager Support',
      'Flexible Room Configuration (2 BHK to 5 BHK)'
    ],
    amenities: [
      { name: 'Custom Interior Design', icon: 'Cpu' },
      { name: 'Private Pool / Garden Option', icon: 'Waves' },
      { name: 'Smart Automation Ready', icon: 'Zap' }
    ],
    floorPlans: [
      {
        title: 'Custom Luxury Plan Sample',
        bhk: 'Custom BHK',
        area: '2,800 Sq.Ft.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        price: 'Get Quote for Requirements',
        specs: ['Custom Bedroom Layout', 'Double-Height Living Salon', 'Private Rooftop Terrace', 'Custom Bathrooms']
      }
    ],
    nearbyLandmarks: [
      { name: 'Ottapalam Super Specialty Clinic', category: 'Hospital', distance: '6 Mins' },
      { name: 'Padiyur High School', category: 'School', distance: '3 Mins' }
    ],
    constructionMilestones: [
      { stage: 'Design Consultation & Plan Finalization', percentage: 100, description: 'Custom architectural drafting complete.', date: 'Dec 2025' },
      { stage: 'Site Preparation & Structural Execution', percentage: 45, description: 'Ongoing custom construction.', date: 'In Progress' }
    ]
  },
  {
    id: 'mna-land-plots',
    title: 'Land Plot',
    tagline: 'Approved Clear-Title Residential Plots Ready for Construction',
    slug: 'land',
    location: 'Riverbank Boulevard, Padiyur',
    city: 'PADIYUR OTTAPALAYAM',
    priceStarting: '₹ 18 Lacs',
    priceNumeric: 1800000,
    status: 'Under Construction',
    type: 'Land',
    bedrooms: '1 BHK',
    carpetArea: '3 - 10 Cents (1,300 - 4,350 Sq.Ft.)',
    possessionDate: 'Immediate Handover',
    completionPercentage: 85,
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    reraId: 'K-RERA/PRJ/OTP/2025/104',
    architect: 'MNA Urban Planning',
    description: 'Clear-title residential land plots situated in prime Padiyur Ottapalayam with paved roads, water connection, electricity cabling, and gated perimeter boundaries.',
    highlights: [
      '100% Clear Ownership Title Deeds',
      'Paved Tar Access Roads & Streetlights',
      'Immediate Registration & Construction Ready',
      'Piped Water & Electricity Point Connection'
    ],
    amenities: [
      { name: 'Gated Perimeter Fence', icon: 'ShieldCheck' },
      { name: 'Blacktop Road Network', icon: 'Car' },
      { name: 'Street Lighting & Water Connection', icon: 'Zap' }
    ],
    floorPlans: [
      {
        title: '5 Cent Residential Plot',
        bhk: 'Land',
        area: '2,178 Sq.Ft. (5 Cents)',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
        price: '₹ 18 Lacs',
        specs: ['Rectangular Clear Plot', '30 Ft Wide Frontage Road', 'East Facing Options Available']
      }
    ],
    nearbyLandmarks: [
      { name: 'Padiyur Community Health Centre', category: 'Hospital', distance: '3 Mins' },
      { name: 'NSS College Ottapalam', category: 'School', distance: '5 Mins' }
    ],
    constructionMilestones: [
      { stage: 'Plot Demarcation & Infrastructure Development', percentage: 85, description: 'Roads and drainage installed.', date: 'In Progress' }
    ]
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ramesh & Sunitha Nair',
    role: 'Business Owner & Resident',
    projectPurchased: '2 BHK Individual House (House #04)',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    review: 'MNA Realestate and Construction did not just sell us a house; they engineered an individual home in Padiyur Ottapalayam that surpassed every expectation we had. Their construction quality, timely updates, and commitment were unmatched.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'test-2',
    name: 'K. V. Menon',
    role: 'Retired Government Officer',
    projectPurchased: '1 BHK Individual House',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    review: 'The construction process was smooth. Zero issues, crystal clear RERA documentation, and excellent quality finish for our 1 BHK home in Padiyur.'
  },
  {
    id: 'test-3',
    name: 'Dr. Evelyn Thomas & Family',
    role: 'Medical Specialist',
    projectPurchased: 'Customized Type Individual House',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    review: 'From our custom floorplan drafting with the MNA team to material selection, the team demonstrated uncompromising integrity and flawless execution. On-time delivery guaranteed!'
  }
];

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '2 BHK Individual House - Modern Elevation View',
    category: 'Exterior Architecture',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    projectRef: '2 BHK Individual House'
  },
  {
    id: 'gal-2',
    title: '1 BHK Individual House - Living Room Interiors',
    category: 'Interior Design',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    projectRef: '1 BHK Individual House'
  },
  {
    id: 'gal-3',
    title: 'Customized Type House - Terrace & Elevation Design',
    category: 'Exterior Architecture',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    projectRef: 'Customized Type Individual House'
  },
  {
    id: 'gal-4',
    title: 'Clear-Title Land Plots - Paved Access Road & Layout',
    category: 'Drone Views',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    projectRef: 'Clear-Title Land Plots'
  },
  {
    id: 'gal-5',
    title: 'Reinforced Concrete Structure & Pillar Construction Progress',
    category: 'Construction Updates',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'gal-6',
    title: 'Premium Bath & Granite Fittings',
    category: 'Interior Design',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'gal-7',
    title: 'Gated Community Entrance & Compound Enclosure',
    category: 'Amenities',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'gal-8',
    title: 'Children’s Park & Landscaped Open Play Space',
    category: 'Amenities',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'gal-9',
    title: 'Paved Tar Road & Infrastructure Layout',
    category: 'Amenities',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=80'
  }
];

export const MOCK_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Principal Project Architect',
    department: 'Design & Architecture',
    location: 'Ottapalayam HQ',
    type: 'Full-time',
    experience: '8+ Years in High-End Luxury Residential',
    description: 'Lead the architectural design and management for our upcoming residential projects in Padiyur Ottapalayam.',
    requirements: [
      'B.Arch / M.Arch from accredited architectural institute',
      'Proven experience leading design teams on residential developments',
      'Mastery in CAD, Revit, and sustainable building standards'
    ]
  },
  {
    id: 'job-2',
    title: 'Director of Civil Construction & Quality Control',
    department: 'Engineering & Construction',
    location: 'Padiyur Ottapalayam',
    type: 'Full-time',
    experience: '10+ Years in Civil Engineering & Construction Management',
    description: 'Oversee structural execution, contractor compliance, safety protocols, and zero-defect quality assurance for MNA projects.',
    requirements: [
      'Degree in Civil Engineering or Construction Management',
      'Experience delivering multi-story residential towers and villa communities',
      'Strong expertise in concrete casting and quality audits'
    ]
  },
  {
    id: 'job-3',
    title: 'Luxury Property Sales Manager',
    department: 'Sales & Client Relations',
    location: 'Padiyur Ottapalayam',
    type: 'Full-time',
    experience: '5+ Years in Real Estate Advisory',
    description: 'Provide personalized advisory services to homebuyers and investors looking for luxury properties in Padiyur Ottapalayam.',
    requirements: [
      'Demonstrated track record in residential real estate sales',
      'Exceptional relationship management and communication skills',
      'Deep understanding of real estate financing and RERA legal frameworks'
    ]
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Booking & Payments',
    question: 'How do I reserve an exclusive residence or villa with MNA Realestate and Construction?',
    answer: 'Reserving a property with MNA Realestate and Construction requires an initial booking deposit (typically 5% to 10% of total property value). Once submitted, our sales team secures your specific unit or plot for 14 days while customized legal agreements and payment plans are finalized.'
  },
  {
    id: 'faq-2',
    category: 'Construction & Timelines',
    question: 'What guarantees on-time project completion and delivery?',
    answer: 'MNA Realestate and Construction operates with strict performance bonds and construction schedules. Every buyer receives live access to our Client Portal with milestone updates, photos, and engineering audits.'
  },
  {
    id: 'faq-3',
    category: 'Loans & Finance',
    question: 'Are there pre-approved home loan options with major financial institutions?',
    answer: 'Yes. All MNA Realestate and Construction developments hold approvals with major national and private banks (SBI, HDFC Bank, ICICI Bank, Axis Bank), facilitating smooth housing loan approvals and preferential interest rates.'
  },
  {
    id: 'faq-4',
    category: 'Handover & Legal',
    question: 'Are all projects 100% legally approved with RERA and clear titles?',
    answer: 'Uncompromising legal integrity is our core foundation. Every project holds clear land title deeds, zero-encumbrance certificates, local municipal approvals, environmental impact certifications, and valid K-RERA registration numbers prior to launch.'
  },
  {
    id: 'faq-5',
    category: 'Customization',
    question: 'Can I customize the interior layout and materials of my unit during construction?',
    answer: 'Yes! Buyers who join before structural completion work directly with our interior team. You can select custom flooring tiles, kitchen fittings, bathroom fixtures, and electrical layout packages.'
  }
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'MOHAMMED FAROOK',
    role: 'Founder & Visionary, MNA Realestate & Construction',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    bio: 'Pioneering affordable, trustworthy, and high-quality homeownership for families across Padiyur Ottapalayam with over 20+ years of construction excellence.'
  },
  {
    id: 'team-advisor',
    name: 'KALIMULLAH',
    role: 'Chief Advisor, MNA Realestate & Construction',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    bio: 'With extensive insight and strategic guidance, KALIMULLAH plays a key role in shaping the vision and direction of MNA Realestate & Construction. His experience, thoughtful leadership, and commitment to quality help us make better decisions, maintain high standards, and stay focused on our goal of making quality homeownership accessible to every family.'
  }
];

export const COMPANY_STATS = [
  { label: 'Years of Experience', value: '20+', numeric: 20, suffix: '+' },
  { label: 'Projects Completed', value: '48+', numeric: 48, suffix: '+' },
  { label: 'Homes Delivered', value: '50+', numeric: 50, suffix: '+' },
  { label: 'Happy Families', value: '50+', numeric: 50, suffix: '+' }
];

export const MOCK_CLIENT_DATA = {
  customerId: 'CUST-89421',
  name: 'Anand Kumar',
  email: 'anand.kumar@gmail.com',
  phone: '+91 8220000313',
  projectName: 'MNA Solaris Estates',
  houseNumber: 'Villa #04 (The Crown Villa)',
  purchasedProperty: 'MNA Solaris Estates - PADIYUR OTTAPALAYAM',
  bookingDate: 'January 15, 2025',
  overallProgress: 72,
  estimatedCompletion: 'December 18, 2026',
  remainingDays: 138,
  currentPhase: 'Electrical & Plumbing Rough-In',
  projectStatusBadge: 'Under Construction (72%)',
  stages: [
    { id: 'stg-1', name: 'Foundation', status: 'Completed', percentage: 100 },
    { id: 'stg-2', name: 'Structure', status: 'Completed', percentage: 100 },
    { id: 'stg-3', name: 'Brick Work', status: 'Completed', percentage: 100 },
    { id: 'stg-4', name: 'Roofing', status: 'Completed', percentage: 100 },
    { id: 'stg-5', name: 'Electrical', status: 'In Progress', percentage: 65 },
    { id: 'stg-6', name: 'Plumbing', status: 'In Progress', percentage: 50 },
    { id: 'stg-7', name: 'Painting', status: 'Pending', percentage: 0 },
    { id: 'stg-8', name: 'Interior Work', status: 'Pending', percentage: 0 },
    { id: 'stg-9', name: 'Final Inspection', status: 'Pending', percentage: 0 },
    { id: 'stg-10', name: 'Handover', status: 'Pending', percentage: 0 },
  ],
  timeline: [
    { id: 'tm-1', date: 'June 15, 2025', title: 'Foundation Completed', description: 'Deep piling and concrete foundation pour passed 100% engineering inspection.' },
    { id: 'tm-2', date: 'July 02, 2025', title: 'Columns Completed', description: 'RCC load-bearing columns installed on Villa #04.' },
    { id: 'tm-3', date: 'July 18, 2025', title: 'Roof Casting Completed', description: 'Roof slab casting and waterproofing finalized.' },
    { id: 'tm-4', date: 'August 10, 2025', title: 'Electrical Work Started', description: 'Concealed wiring conduit installation initiated.' },
    { id: 'tm-5', date: 'August 28, 2025', title: 'Plumbing & MEP Rough-In Initiated', description: 'Plumbing and electrical conduit fitment underway.' }
  ],
  photos: [
    { id: 'ph-1', title: 'Villa #04 Structural Elevation View', date: 'August 1, 2026', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', category: 'Structure' },
    { id: 'ph-2', title: 'Living Room Framing', date: 'July 28, 2026', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', category: 'Interior' },
    { id: 'ph-3', title: 'Pool Deck Concrete Pour', date: 'July 20, 2026', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', category: 'Exterior' },
    { id: 'ph-4', title: 'Electrical Hub Fitment', date: 'August 2, 2026', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80', category: 'Electrical' },
    { id: 'ph-5', title: 'Flooring Tile Slab Delivery', date: 'July 15, 2026', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', category: 'Materials' },
    { id: 'ph-6', title: 'Covered Parking Foundation', date: 'June 30, 2026', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', category: 'Foundation' }
  ],
  documents: [
    { id: 'doc-1', title: 'Master Sale Agreement', type: 'Agreement', fileSize: '4.8 MB', date: 'Jan 15, 2025' },
    { id: 'doc-2', title: 'Architectural Floor Plan (2+ BHK Crown Villa)', type: 'Floor Plan', fileSize: '12.4 MB', date: 'Jan 20, 2025' },
    { id: 'doc-3', title: 'Official Payment Receipts & Invoices', type: 'Payment Receipts', fileSize: '2.1 MB', date: 'Aug 01, 2026' },
    { id: 'doc-4', title: 'Structural Integrity Warranty Certificate', type: 'Warranty', fileSize: '1.8 MB', date: 'Feb 05, 2025' },
    { id: 'doc-5', title: 'MNA Solaris Architectural Brochure', type: 'Brochure', fileSize: '18.5 MB', date: 'Jan 10, 2025' }
  ],
  payment: {
    totalCost: '₹ 85 Lacs',
    paidAmount: '₹ 61.2 Lacs',
    pendingAmount: '₹ 23.8 Lacs',
    nextInstallmentAmount: '₹ 8.5 Lacs',
    nextInstallmentDate: 'October 15, 2026',
    paymentStatus: 'Up to Date',
    percentagePaid: 72
  },
  notifications: [
    { id: 'notif-1', title: 'New construction progress photos uploaded for August 2026', time: '2 hours ago', type: 'photo', read: false },
    { id: 'notif-2', title: 'Electrical rough-in completed for Ground Floor Living Area', time: 'Yesterday', type: 'update', read: false },
    { id: 'notif-3', title: 'Your requested Site Visit is approved for Aug 12, 11:00 AM', time: '3 days ago', type: 'visit', read: true },
    { id: 'notif-4', title: 'Installment payment receipt generated (₹ 8.5 Lacs)', time: '1 week ago', type: 'payment', read: true }
  ]
};
