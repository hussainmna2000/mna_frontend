import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';

interface LegalPageProps {
  darkMode: boolean;
}

export default function Terms({ darkMode }: LegalPageProps) {
  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Terms & Conditions' }]} darkMode={darkMode} />

        <SectionHeader
          badge="Legal Framework"
          title="Terms & Conditions"
          subtitle="Last updated: August 2026 • Governing Terms of Service & Property Disclaimers"
          darkMode={darkMode}
        />

        <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl space-y-6 text-sm leading-relaxed ${
          darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-800'
        }`}>
          <h3 className="text-lg font-serif font-bold text-emerald-400">1. Acceptance of Terms</h3>
          <p>
            By accessing or using the MNA Realestate and Construction website and digital reservation services, you agree to comply with and be bound by these Terms and Conditions.
          </p>

          <h3 className="text-lg font-serif font-bold text-emerald-400">2. RERA & Architectural Disclaimers</h3>
          <p>
            All architectural renders, floor plans, dimensions, and virtual 3D walkthroughs depicted on this website are artistic conceptualizations. Actual building finishes, landscaping, and room dimensions are subject to final municipal engineering approvals and certified RERA plot boundaries.
          </p>

          <h3 className="text-lg font-serif font-bold text-emerald-400">3. Reservation Deposits & Price Locks</h3>
          <p>
            Initial expression-of-interest deposits reserve specific property plots for 14 days. Official binding sales agreements are executed only upon signature of formal legal contracts and verification of bank escrow documentation.
          </p>

          <h3 className="text-lg font-serif font-bold text-emerald-400">4. Intellectual Property</h3>
          <p>
            All architectural designs, floor plans, brand marks, and photography are proprietary intellectual property of MNA Realestate and Construction LLC.
          </p>
        </div>

      </div>
    </div>
  );
}
