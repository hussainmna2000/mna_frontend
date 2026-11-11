import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Layout & Common Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import BackToTop from './components/layout/BackToTop';
import StickyCTA from './components/layout/StickyCTA';
import Toast from './components/common/Toast';
import ScrollToTop from './components/common/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import BookVisit from './pages/BookVisit';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ClientLogin from './pages/ClientLogin';
import ClientDashboard from './pages/ClientDashboard';

// Admin Suite
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminProtectedRoute from './pages/admin/AdminProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminBookings from './pages/admin/AdminBookings';
import AdminProperties from './pages/admin/AdminProperties';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLogs from './pages/admin/AdminLogs';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />

      <div className="min-h-screen flex flex-col font-sans bg-black text-zinc-100 dark">
        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <Routes>
          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Administrative Suite */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Public Website Routes (Wrapped with Header, Footer, and Floating widgets) */}
          <Route
            element={
              <>
                <Navbar darkMode={true} />
                <main className="flex-1">
                  <Outlet />
                </main>
                <FloatingWhatsApp />
                <BackToTop />
                <StickyCTA />
                <Footer onShowToast={showToast} darkMode={true} />
              </>
            }
          >
            <Route path="/" element={<Home darkMode={true} />} />
            <Route path="/about" element={<About darkMode={true} />} />
            <Route path="/projects" element={<Projects darkMode={true} />} />
            <Route path="/projects/:id" element={<ProjectDetails darkMode={true} onShowToast={showToast} />} />
            <Route path="/gallery" element={<Gallery darkMode={true} />} />
            <Route path="/testimonials" element={<Testimonials darkMode={true} />} />
            <Route path="/client-login" element={<ClientLogin darkMode={true} onShowToast={showToast} />} />
            <Route path="/client-dashboard" element={<ClientDashboard darkMode={true} onShowToast={showToast} />} />
            <Route path="/contact" element={<Contact darkMode={true} onShowToast={showToast} />} />
            <Route path="/book-visit" element={<BookVisit darkMode={true} onShowToast={showToast} />} />
            <Route path="/faq" element={<FAQ darkMode={true} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy darkMode={true} />} />
            <Route path="/terms" element={<Terms darkMode={true} />} />
            <Route path="*" element={<Home darkMode={true} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
