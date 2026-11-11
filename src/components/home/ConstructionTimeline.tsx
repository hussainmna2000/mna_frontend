import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { 
  Compass, 
  PencilRuler, 
  FileCheck2, 
  Building2, 
  Sparkles, 
  Key, 
  CheckCircle2 
} from 'lucide-react';

interface ConstructionTimelineProps {
  darkMode?: boolean;
}

export default function ConstructionTimeline({ darkMode = false }: ConstructionTimelineProps) {
  const [activeStep, setActiveStep] = useState(3); // default step 4

  const steps = [
    {
      step: 1,
      title: 'Planning & Land Acquisition',
      sub: 'Clear Title Deed Verification',
      icon: Compass,
      duration: 'Months 0 - 3',
      desc: '100% clear title verification, environmental impact study, soil testing, and zero-carbon energy grid planning.',
      details: ['Clear Land Title Certification', 'Environmental Clearance Passed', 'Topographical 3D LiDAR Survey']
    },
    {
      step: 2,
      title: 'Architectural & Engineering Design',
      sub: 'BIM & Structural Modeling',
      icon: PencilRuler,
      duration: 'Months 3 - 6',
      desc: 'Collaborating with award-winning architectural masters to finalize floor plans, cantilevered structures, and MEP schematics.',
      details: ['3D VR Virtual Walkthrough Created', 'Structural Dampers Designed', 'Interior Travertine & Millwork Sourced']
    },
    {
      step: 3,
      title: 'Legal & RERA Approvals',
      sub: 'Bank Guarantee Lock',
      icon: FileCheck2,
      duration: 'Months 6 - 8',
      desc: 'Securing full municipal building permits, RERA registrations, and tier-1 bank loan pre-approvals for prospective buyers.',
      details: ['Official RERA ID Sanctioned', 'Escrow Account Established', 'Tier-1 Bank Pre-Approvals Secured']
    },
    {
      step: 4,
      title: 'Heavy Civil Construction',
      sub: 'RCC Frame & Substructure',
      icon: Building2,
      duration: 'Months 8 - 20',
      desc: '80ft deep piling, seismic Dampers, heavy-duty RCC slab casting, and acoustic glass curtain wall installation.',
      details: ['Subterranean Car Gallery Cast', 'Slab Pouring Milestones Tracked', '24/7 Drone Live Feed Portal Active']
    },
    {
      step: 5,
      title: 'Interior Finishing & Landscaping',
      sub: 'Craftsmanship & Testing',
      icon: Sparkles,
      duration: 'Months 20 - 24',
      desc: 'Italian marble fitting, Crestron AI smart automation commissioning, private pool waterproofing, and lush botanical gardens.',
      details: ['Boffi Kitchen Installation', 'Acoustic Insulation Certified', 'Pool & Spa Pressure Tested']
    },
    {
      step: 6,
      title: 'Handover & Concierge Onboarding',
      sub: 'White-Glove Keys Ceremony',
      icon: Key,
      duration: 'Month 24+',
      desc: 'Snag-free final inspection, occupancy certificate handover, and 24/7 dedicated estate concierge activation.',
      details: ['Zero-Snag Certificate Handed', 'Occupancy Certificate Issued', '24/7 Concierge Activated']
    }
  ];

  return (
    <section className={`py-24 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Precision Timeline"
          title="Our Construction & Handover Journey"
          subtitle="Transparency at every stage. Follow our structured 6-phase development roadmap."
          darkMode={darkMode}
        />

        {/* Desktop Interactive Horizontal Timeline Bar */}
        <div className="hidden lg:flex items-center justify-between relative mb-12">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-800 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = idx <= activeStep;
            const isActive = idx === activeStep;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-lg ${
                  isActive
                    ? 'bg-gradient-to-tr from-emerald-600 via-emerald-700 to-black text-white scale-110 ring-4 ring-emerald-500/40 border border-emerald-500/30'
                    : isCompleted
                    ? 'bg-emerald-600 text-white font-extrabold'
                    : darkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold mt-3 max-w-[120px] text-center ${
                  isActive ? 'text-emerald-400 font-extrabold' : darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  Phase 0{s.step}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{s.duration}</span>
              </button>
            );
          })}
        </div>

        {/* Step Details Box */}
        <div className={`p-8 rounded-3xl border shadow-2xl transition-all duration-300 ${
          darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Phase 0{steps[activeStep].step} • {steps[activeStep].duration}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {steps[activeStep].sub}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-500">
                {steps[activeStep].title}
              </h3>

              <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {steps[activeStep].desc}
              </p>

              <div className="pt-2 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  Phase Deliverables & Audits:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {steps[activeStep].details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-emerald-600/10 to-black/30 rounded-2xl p-6 border border-emerald-500/20 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-700 to-black text-white flex items-center justify-center shadow-xl mb-4">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
              <p className="text-sm font-bold">Live Progress Tracking Portal</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                MNA Realestate and Construction buyers receive private login access to monitor construction milestones, drone video logs, and engineering reports in real time.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
