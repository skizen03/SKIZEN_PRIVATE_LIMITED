import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { LenisAnchorHandler } from './providers/LenisAnchorHandler';

function App() {
  return (
    <div className="min-h-screen font-inter antialiased" style={{ background: '#FAFAF8', color: '#0F0F0E' }}>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <CustomCursor />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <LenisAnchorHandler />
      <Analytics />
    </div>
  );
}

export default App;
