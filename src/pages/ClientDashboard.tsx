import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Calendar, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  FileText, 
  Maximize2,
  X,
  Send,
  Bell,
  MessageSquare
} from 'lucide-react';
import { MOCK_CLIENT_DATA } from '../data/mockData';
import LightboxModal from '../components/common/LightboxModal';
import Breadcrumb from '../components/layout/Breadcrumb';

interface ClientDashboardProps {
  darkMode: boolean;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export default function ClientDashboard({ darkMode, onShowToast }: ClientDashboardProps) {
  const navigate = useNavigate();
  const data = MOCK_CLIENT_DATA;

  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'photos' | 'documents' | 'payments' | 'notifications' | 'profile'>('overview');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState('');

  const handleLogout = () => {
    if (onShowToast) {
      onShowToast('Logged out of Client Portal successfully.', 'info');
    }
    navigate('/client-login');
  };

  const handleDocumentDownload = (docTitle: string) => {
    if (onShowToast) {
      onShowToast(`Downloading "${docTitle}"...`, 'success');
    }
  };

  const handleRaiseTicket = (e: FormEvent) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast(`Support ticket submitted successfully! Ticket ID: #TK-${Math.floor(1000 + Math.random() * 9000)}`, 'success');
    }
    setSupportModalOpen(false);
    setTicketSubject('');
    setTicketMessage('');
  };

  const handleScheduleVisit = (e: FormEvent) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast(`Site visit request submitted for ${visitDate || 'upcoming date'}! Our Project Manager will confirm.`, 'success');
    }
    setSiteVisitModalOpen(false);
    setVisitDate('');
  };

  const galleryImagesForLightbox = data.photos.map(p => p.url);

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors ${
      darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Client Dashboard', path: '/client-dashboard' }]} darkMode={darkMode} />
        </div>

        {/* HEADER BANNER & CUSTOMER SUMMARY */}
        <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden mb-8 transition-all ${
          darkMode 
            ? 'bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border-zinc-800 text-white' 
            : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-black border-emerald-500/20 text-white'
        }`}>
          {/* Decorative subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-black flex items-center justify-center text-white text-2xl font-bold font-serif shadow-lg border border-white/20">
                JS
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Welcome, {data.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {data.projectStatusBadge}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-300 mt-1 font-mono">
                  <span>Customer ID: <strong className="text-white">{data.customerId}</strong></span>
                  <span>•</span>
                  <span>Project: <strong className="text-white">{data.projectName}</strong></span>
                  <span>•</span>
                  <span>House: <strong className="text-emerald-400">{data.houseNumber}</strong></span>
                </div>
              </div>
            </div>

            {/* Logout & Quick Actions */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <button
                onClick={() => setSupportModalOpen(true)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                Support Ticket
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-full text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/50 text-white border border-emerald-500/30 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* QUICK STATS CARDS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Overall Progress */}
          <div className={`p-5 rounded-2xl border shadow-lg transition-all ${
            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Overall Progress
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-emerald-400">
                {data.overallProgress}%
              </span>
              <span className="text-xs text-zinc-400">Construction Completed</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-black h-2 rounded-full transition-all duration-1000"
                style={{ width: `${data.overallProgress}%` }}
              />
            </div>
          </div>

          {/* Card 2: Estimated Completion */}
          <div className={`p-5 rounded-2xl border shadow-lg transition-all ${
            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Est. Handover Date
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl font-bold font-serif text-zinc-900 dark:text-white">
              {data.estimatedCompletion}
            </div>
            <div className="text-xs text-emerald-400 mt-2 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {data.remainingDays} Days Remaining
            </div>
          </div>

          {/* Card 3: Current Phase */}
          <div className={`p-5 rounded-2xl border shadow-lg transition-all ${
            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Current Phase
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-base font-bold text-zinc-900 dark:text-white truncate">
              {data.currentPhase}
            </div>
            <div className="text-xs text-emerald-400 mt-2 font-medium">
              Phase 5 & 6 Active
            </div>
          </div>

          {/* Card 4: Next Payment */}
          <div className={`p-5 rounded-2xl border shadow-lg transition-all ${
            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Next Installment
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl font-bold text-emerald-400">
              {data.payment.nextInstallmentAmount}
            </div>
            <div className="text-xs text-zinc-400 mt-2">
              Due: {data.payment.nextInstallmentDate}
            </div>
          </div>

        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-8 border border-zinc-200 dark:border-zinc-800">
          {[
            { id: 'overview', label: 'Overview & Progress' },
            { id: 'photos', label: 'Construction Photos' },
            { id: 'documents', label: 'Documents & Receipts' },
            { id: 'payments', label: 'Payment Summary' },
            { id: 'notifications', label: 'Notifications', badge: data.notifications.filter(n => !n.read).length },
            { id: 'profile', label: 'Customer Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* TAB CONTENT SECTIONS */}

        {/* TAB 1: OVERVIEW & PROGRESS */}
        {(activeTab === 'overview' || activeTab === 'progress') && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Stage Progress Bar List & Circular Chart */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Construction Stages Checklist */}
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-serif font-bold">Construction Stages Checklist</h3>
                      <p className="text-xs text-zinc-400">Real-time verification by site project managers</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      10 Total Stages
                    </span>
                  </div>

                  <div className="space-y-4">
                    {data.stages.map((stage) => {
                      const isCompleted = stage.status === 'Completed';
                      const isInProgress = stage.status === 'In Progress';

                      return (
                        <div key={stage.id} className={`p-4 rounded-2xl border transition-all ${
                          isCompleted
                            ? darkMode ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-emerald-50/70 border-emerald-200'
                            : isInProgress
                            ? darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                            : darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-400'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                              ) : isInProgress ? (
                                <div className="w-7 h-7 rounded-full bg-zinc-700 text-white flex items-center justify-center shrink-0">
                                  <Clock className="w-4 h-4" />
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-zinc-300 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0">
                                  <Clock className="w-4 h-4 opacity-50" />
                                </div>
                              )}
                              <span className={`text-sm font-bold ${
                                isCompleted ? 'text-emerald-400' : isInProgress ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'
                              }`}>
                                {stage.name}
                              </span>
                            </div>

                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : isInProgress
                                ? 'bg-zinc-800 text-zinc-300'
                                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                            }`}>
                              {isCompleted ? '✔ Completed' : isInProgress ? '⏳ In Progress' : '⌛ Pending'}
                            </span>
                          </div>

                          {/* Stage Individual Bar */}
                          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 mt-2 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-700 ${
                                isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-zinc-500' : 'bg-transparent'
                              }`}
                              style={{ width: `${stage.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Animated Circular Progress Chart & Timeline Updates */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Circular Chart Card */}
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl text-center transition-all ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <h3 className="text-xl font-serif font-bold mb-2">Construction Percentage</h3>
                  <p className="text-xs text-zinc-400 mb-6">Calculated via certified structural engineering audits</p>

                  {/* SVG Circular Chart */}
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-zinc-200 dark:text-zinc-800 fill-none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 * (1 - data.overallProgress / 100)}
                        strokeLinecap="round"
                        className="text-emerald-500 fill-none transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-serif font-bold text-emerald-400">
                        {data.overallProgress}%
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mt-1">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-left">
                    <div className="flex items-center justify-between mb-1 font-bold">
                      <span>Phase: {data.currentPhase}</span>
                      <span className="text-emerald-400">{data.remainingDays} days left</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      Structure and masonry fully signed off. Electrical conduit installation underway.
                    </p>
                  </div>
                </div>

                {/* Latest Site Updates Timeline */}
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    Latest Site Updates Timeline
                  </h3>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500/30">
                    {data.timeline.map((item) => (
                      <div key={item.id} className="relative">
                        <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 ring-4 ring-emerald-500/10" />
                        <div>
                          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                            {item.date}
                          </span>
                          <h4 className="text-sm font-bold mt-1 text-zinc-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Support Actions Bar */}
            <div className={`p-6 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div>
                <h4 className="text-base font-serif font-bold">Have questions regarding your construction progress?</h4>
                <p className="text-xs text-zinc-400">Connect with your dedicated Project Manager or schedule an on-site walkthrough.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSupportModalOpen(true)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-black hover:opacity-90 shadow-md flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  Raise Support Ticket
                </button>
                <button
                  onClick={() => setSiteVisitModalOpen(true)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Schedule Site Visit
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CONSTRUCTION PHOTOS */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold">Latest Site Progress Photos</h3>
                <p className="text-xs text-zinc-400">Click any photograph to open full-screen lightbox inspection</p>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                {data.photos.length} Photos Captured
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`group rounded-3xl overflow-hidden border shadow-lg cursor-pointer transition-all transform hover:-translate-y-1 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4" /> Expand Photo
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-black/80 text-white backdrop-blur-md">
                      {photo.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-400 transition-colors">
                      {photo.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2 text-xs text-zinc-400 font-mono">
                      <span>{photo.date}</span>
                      <span className="text-emerald-400 font-bold">Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold">Property Documents & Certificates</h3>
                <p className="text-xs text-zinc-400">Encrypted access to your legal agreements, floor plans, and tax receipts</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-6 rounded-3xl border shadow-lg transition-all flex flex-col justify-between ${
                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {doc.type}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono mb-6">
                      Size: {doc.fileSize} • Uploaded: {doc.date}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDocumentDownload(doc.title)}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-emerald-600 to-black hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4 text-white" />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Payment Summary breakdown */}
              <div className="lg:col-span-7">
                <div className={`p-8 rounded-3xl border shadow-xl transition-all ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    Payment Summary & Balance Ledger
                  </h3>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400 font-semibold uppercase">Total Villa Cost</span>
                      <p className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mt-1">{data.payment.totalCost}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-xs text-emerald-400 font-semibold uppercase">Paid Amount</span>
                      <p className="text-2xl font-serif font-bold text-emerald-400 mt-1">{data.payment.paidAmount}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400 font-semibold uppercase">Pending Balance</span>
                      <p className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mt-1">{data.payment.pendingAmount}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400 font-semibold uppercase">Next Installment</span>
                      <p className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mt-1">{data.payment.nextInstallmentAmount}</p>
                    </div>
                  </div>

                  {/* Payment Progress bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Payment Settlement ({data.payment.percentagePaid}%)</span>
                      <span className="text-emerald-400">{data.payment.paymentStatus}</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-black h-3 rounded-full" style={{ width: `${data.payment.percentagePaid}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                    <div>
                      <strong>Upcoming Installment Notice:</strong> Next scheduled milestone installment of {data.payment.nextInstallmentAmount} is due on {data.payment.nextInstallmentDate} upon completion of Electrical Fitting audit.
                    </div>
                  </div>
                </div>
              </div>

              {/* Installment Schedule */}
              <div className="lg:col-span-5">
                <div className={`p-8 rounded-3xl border shadow-xl transition-all ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <h3 className="text-xl font-serif font-bold mb-6">Installment Milestones</h3>

                  <div className="space-y-4">
                    {[
                      { milestone: 'Booking & Agreement Signing', amount: '₹ 8.5 Lacs', date: 'Jan 15, 2025', status: 'Paid' },
                      { milestone: 'Foundation & Excavation', amount: '₹ 17.0 Lacs', date: 'Apr 20, 2025', status: 'Paid' },
                      { milestone: 'Superstructure Slab Pour', amount: '₹ 18.0 Lacs', date: 'Oct 10, 2025', status: 'Paid' },
                      { milestone: 'Brickwork & Masonry', amount: '₹ 17.7 Lacs', date: 'Jul 15, 2026', status: 'Paid' },
                      { milestone: 'Electrical & Plumbing Rough-In', amount: '₹ 8.5 Lacs', date: 'Oct 15, 2026', status: 'Upcoming' },
                      { milestone: 'Handover & Final Possession', amount: '₹ 15.3 Lacs', date: 'Dec 18, 2026', status: 'Pending' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-white">{item.milestone}</p>
                          <p className="text-[11px] text-zinc-400 font-mono">Due: {item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold font-serif text-emerald-400">{item.amount}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold">Recent Updates & Activity Feed</h3>

            <div className="space-y-4">
              {data.notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-5 rounded-3xl border shadow-md transition-all flex items-start justify-between gap-4 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-1">
                        {notif.time}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0">
                    Activity Notice
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMER PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className={`p-8 rounded-3xl border shadow-xl transition-all ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-black flex items-center justify-center text-white text-2xl font-bold font-serif">
                  JS
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold">{data.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono">Customer ID: {data.customerId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Email Address</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{data.email}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Phone Number</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{data.phone}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Purchased Property</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{data.purchasedProperty}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Booking Date</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{data.bookingDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal for Progress Photos */}
      <LightboxModal
        isOpen={selectedPhotoIndex !== null}
        images={galleryImagesForLightbox}
        currentIndex={selectedPhotoIndex || 0}
        setCurrentIndex={(newIdx) => setSelectedPhotoIndex(newIdx)}
        onClose={() => setSelectedPhotoIndex(null)}
        title={selectedPhotoIndex !== null ? data.photos[selectedPhotoIndex]?.title : ''}
      />

      {/* Support Ticket Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${
            darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}>
            <button
              onClick={() => setSupportModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold mb-2">Raise Support Ticket</h3>
            <p className="text-xs text-zinc-400 mb-6">Our site engineering team will respond within 4 business hours.</p>

            <form onSubmit={handleRaiseTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Request electrical fitting custom layout"
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Message</label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your query in detail..."
                  rows={4}
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-black hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-white" />
                Submit Support Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Site Visit Modal */}
      {siteVisitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${
            darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}>
            <button
              onClick={() => setSiteVisitModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold mb-2">Schedule Site Walkthrough</h3>
            <p className="text-xs text-zinc-400 mb-6">Pick a date to visit Villa #04 with your site manager.</p>

            <form onSubmit={handleScheduleVisit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Preferred Visit Date</label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-black hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                Confirm Site Walkthrough
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
