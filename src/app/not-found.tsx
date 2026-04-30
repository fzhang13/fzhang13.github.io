'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import Footer from '@/components/layout/Footer';
import CRTOverlay from '@/components/layout/CRTOverlay';
import NotFoundPage from '@/components/pages/NotFoundPage';

export default function NotFound() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-shell mx-auto px-6 md:px-10 py-8 md:py-12">
            <NotFoundPage />
          </div>
        </main>
        <Footer />
      </div>
      <CRTOverlay />
    </div>
  );
}
