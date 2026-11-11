import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';

interface LegalPageProps {
  darkMode: boolean;
}

export default function PrivacyPolicy({ darkMode }: LegalPageProps) {
  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} darkMode={darkMode} />

        <SectionHeader
          badge="Legal Compliance"
          title="Privacy Policy"
          subtitle="Last updated: August 2026 • Confidentiality & Data Protection Standards"
          darkMode={darkMode}
        />

        <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl space-y-6 text-sm leading-relaxed ${
          darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-800'
        }`}>
          <h3 className="text-lg font-serif font-bold text-emerald-400">1. Data Confidentiality Guarantee</h3>
          <p>
            MNA Realestate and Construction holds user privacy and financial confidentiality as paramount. Any contact details, financial capacity disclosures, or private booking requests submitted to our sales desks are stored securely.
          </p>

          <h3 className="text-lg font-serif font-bold text-emerald-400">2. Collection of Personal Information</h3>
          <p>
            We collect personal information solely when voluntarily provided by users during private site visit reservations, brochure downloads, or inquiry forms. This includes full names, private email addresses, telephone numbers, and property preferences.
          </p>

          <h3 className="text-lg font-serif font-bold text-emerald-400">3. Non-Disclosure to Third Parties</h3>
          <p>
            We strictly do not rent, sell, or trade client information to external third-party marketing companies. Data is shared exclusively with certified banking partners and title escrow officers required to complete legal property acquisitions.
          </p>

          <h3 className="text-lg font-serif font-bold text-emerald-400">4. Contact Privacy Officer</h3>
          <p>
            For privacy inquiries or data erasure requests, please contact our office at <strong className="text-emerald-400">mnagardenpadiyur@gmail.com</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}
