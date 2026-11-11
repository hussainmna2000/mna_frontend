import { useState, FormEvent } from 'react';
import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  Instagram,
  Youtube,
  Facebook
} from 'lucide-react';
import { apiClient } from '../api/client';

interface ContactProps {
  darkMode: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export default function Contact({ darkMode, onShowToast }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('General Luxury Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      onShowToast('Please fill in your name and email.', 'info');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.inquiries.submit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        interest,
        message: message.trim() || 'Inquiry regarding luxury properties in Padiyur Ottapalayam.',
      });
      onShowToast(`Thank you ${name}! Your inquiry has been sent to our Executive Desk.`, 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      onShowToast('We could not send your inquiry. Please try again or call our office.', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Contact Experience Center' }]} darkMode={darkMode} />

        <SectionHeader
          badge="White Glove Service"
          title="Connect With Our Executive Studio"
          subtitle="Our dedicated private estate advisors and chief architects are available for confidential consultations."
          darkMode={darkMode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Contact Details & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className={`p-8 rounded-3xl border shadow-xl space-y-6 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <h3 className="text-xl font-serif font-bold text-emerald-400">Corporate Headquarters</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a 
                  href="https://maps.app.goo.gl/A7zFiF7UsCLkUazy7?g_st=ic"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 group/loc hover:text-emerald-400 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 group-hover/loc:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold flex items-center gap-1.5">
                      MNA Real Estate & Construction
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </p>
                    <p className="text-zinc-400 group-hover/loc:text-zinc-300">Ganapathipalayam / Padiyur (Ottapalayam), Tirupur, 641605</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex flex-wrap gap-x-2">
                    <a href="tel:+918220000313" className="hover:underline">+91 8220000313</a>
                    <span>/</span>
                    <a href="tel:+918220043313" className="hover:underline">+91 8220043313</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:mnagardenpadiyur@gmail.com" className="hover:underline">mnagardenpadiyur@gmail.com</a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/10 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/918220043313"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:opacity-95 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-white" /> Live WhatsApp
                </a>

                <a
                  href="https://www.instagram.com/mnagardentirupur?igsi=dGNlcmpya3RqcThm&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  title="Follow us on Instagram"
                  aria-label="Follow us on Instagram"
                  className="w-11 h-11 rounded-2xl bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-zinc-700/60 shadow-md"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://youtube.com/@mnagarden?si=3Dc4E0v4zO8A94I9"
                  target="_blank"
                  rel="noreferrer"
                  title="Watch our videos on YouTube"
                  aria-label="Watch our videos on YouTube"
                  className="w-11 h-11 rounded-2xl bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-zinc-700/60 shadow-md"
                >
                  <Youtube className="w-5 h-5" />
                </a>

                <a
                  href="https://www.facebook.com/share/1EcqxAv7ks/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  title="Follow us on Facebook"
                  aria-label="Follow us on Facebook"
                  className="w-11 h-11 rounded-2xl bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-zinc-700/60 shadow-md"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Interactive Google Map Visual Link */}
            <a
              href="https://maps.app.goo.gl/A7zFiF7UsCLkUazy7?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl overflow-hidden border border-zinc-800 bg-black h-64 relative flex flex-col justify-between p-6 shadow-xl bg-[radial-gradient(#3f3f46_1.5px,transparent_1.5px)] [background-size:24px_24px] cursor-pointer hover:border-emerald-500/50 transition-all block"
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                  MNA Realestate HQ
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs font-medium text-zinc-300 group-hover:text-white group-hover:bg-emerald-600 flex items-center gap-1.5 transition-all">
                  Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="my-auto text-center z-10 group-hover:scale-105 transition-transform">
                <div className="relative inline-block">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 animate-ping absolute inset-0" />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-700 to-black text-white flex items-center justify-center shadow-2xl relative z-10 border border-emerald-500/40 mx-auto">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-sm font-serif font-bold text-white mt-3 group-hover:text-emerald-400 transition-colors">
                  Ganapathipalayam / Padiyur
                </p>
                <p className="text-xs text-zinc-400">Ottapalayam, Tirupur - 641605</p>
                <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">Click to open directions in Google Maps</p>
              </div>

              <div className="flex items-center justify-between z-10 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                <span>Direct Navigation Route</span>
                <span className="text-emerald-400 font-semibold">Padiyur Ottapalayam</span>
              </div>
            </a>

          </div>

          {/* Right Main Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl space-y-6 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1" /> Confidential Consultation
                </span>
                <h3 className="text-2xl font-serif font-bold mt-2">Send Us a Direct Message</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Fill out the form below and an executive manager will respond within 2 business hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Sterling"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1">Private Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. david@sterling.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (310) 000-0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1">Inquiry Topic</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="1 BHK Individual House">1 BHK Individual House</option>
                      <option value="2 BHK Individual House">2 BHK Individual House</option>
                      <option value="Customized Type Individual House">Customized Type Individual House</option>
                      <option value="Clear-Title Land Plots">Clear-Title Land Plots</option>
                      <option value="Custom Construction / Plan Consultation">Custom Construction / Plan Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your desired property parameters..."
                    className={`w-full p-3.5 rounded-xl text-xs font-semibold border outline-none ${
                      darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 border border-emerald-500/30 shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" /> Send Confidential Message
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
