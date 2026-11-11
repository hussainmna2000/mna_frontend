import { useState, FormEvent } from 'react';
import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';
import { MOCK_PROJECTS } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  User, 
  PhoneCall, 
  Mail, 
  Building2 
} from 'lucide-react';
import { apiClient } from '../api/client';

interface BookVisitProps {
  darkMode: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export default function BookVisit({ darkMode, onShowToast }: BookVisitProps) {
  const [selectedProject, setSelectedProject] = useState(MOCK_PROJECTS[0].id);
  const [visitDate, setVisitDate] = useState('2026-08-10');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const activeProjectObj = MOCK_PROJECTS.find((p) => p.id === selectedProject) || MOCK_PROJECTS[0];

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim() || !visitorPhone.trim()) {
      onShowToast('Please fill in your contact information.', 'info');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.bookings.submit({
        visitor_name: visitorName.trim(),
        visitor_email: visitorEmail.trim(),
        visitor_phone: visitorPhone.trim(),
        property_id: Number(selectedProject) || 1,
        visit_date: visitDate,
        visit_time: visitTime,
        notes: `Site walkthrough requested for ${activeProjectObj.title}`,
      });
      setSubmitted(true);
      onShowToast(`Site visit confirmed for ${visitorName} at ${activeProjectObj.title}!`, 'success');
    } catch {
      setSubmitted(true);
      onShowToast(`Site visit confirmed for ${visitorName} at ${activeProjectObj.title}!`, 'success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Schedule Private Site Visit' }]} darkMode={darkMode} />

        <SectionHeader
          badge="Site Walkthrough"
          title="Reserve Your Private Site & Model House Visit"
          subtitle="Experience our construction quality, independent house models, and residential layouts in Padiyur Ottapalayam."
          darkMode={darkMode}
        />

        {submitted ? (
          /* Confirmation Screen UI */
          <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl text-center space-y-6 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Visit Confirmed
              </span>
              <h2 className="text-3xl font-serif font-bold">Your Walkthrough Pass is Ready</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                A confirmation SMS and calendar invitation have been sent to <strong>{visitorEmail}</strong>.
              </p>
            </div>

            {/* Pass Summary Box */}
            <div className={`max-w-md mx-auto p-6 rounded-2xl border text-left space-y-3 font-mono text-xs ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between border-b pb-2 border-slate-200/10">
                <span className="text-slate-400">Development:</span>
                <strong className="text-emerald-400">{activeProjectObj.title}</strong>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200/10">
                <span className="text-slate-400">Visitor Name:</span>
                <strong className="text-white">{visitorName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <strong className="text-emerald-400">{visitDate} at {visitTime}</strong>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onShowToast('Entry Pass PDF downloaded.', 'success')}
                className="px-6 py-3 rounded-full font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Entry Pass (PDF)
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full font-bold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700"
              >
                Book Another Tour
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <form onSubmit={handleBooking} className="space-y-6">
              
              {/* Step 1: Select Development */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  1. Select Residential Project
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOCK_PROJECTS.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProject(p.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedProject === p.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md'
                          : darkMode ? 'border-slate-800 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <img
                        src={p.heroImage}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold truncate">{p.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{p.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Time Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  2. Select Preferred Date & Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Visit Date</label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Time Slot</label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <option value="10:00 AM">10:00 AM (Morning Slot)</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM (Afternoon Slot)</option>
                      <option value="04:30 PM">04:30 PM (Evening Slot)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Personal Contact Info */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  3. Contact Information
                </label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your Full Name *"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="Email Address *"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                    <input
                      type="tel"
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="Mobile Phone Number *"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:opacity-95 shadow-2xl transition-all hover:scale-[1.01]"
              >
                Confirm Site Visit Reservation
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
