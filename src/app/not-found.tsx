'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import Footer from '@/components/layout/Footer';
import CRTOverlay from '@/components/layout/CRTOverlay';
import NotFoundPage from '@/components/pages/NotFoundPage';
import styles from './(shell)/layout.module.scss';

export default function NotFound() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        <TopNav />
        <main className={styles.main}>
          <div className={styles.container}>
            <NotFoundPage />
          </div>
        </main>
        <Footer />
      </div>
      <CRTOverlay />
    </div>
  );
}
