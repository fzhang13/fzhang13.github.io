'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import Footer from '@/components/layout/Footer';
import CRTOverlay from '@/components/layout/CRTOverlay';
import PageTransition from '@/components/shared/PageTransition';
import styles from './layout.module.scss';

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        <TopNav />
        <main className={styles.main}>
          <div className={styles.container}>
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
        <Footer />
      </div>
      <CRTOverlay />
    </div>
  );
}
