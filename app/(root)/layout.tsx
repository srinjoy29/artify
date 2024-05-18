import React from 'react';
import MobileNav from '@/components/shared/MobileNav';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import styles from '../(root)/image/page.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.mobileNav}>
        <MobileNav />
      </div>
      {/* <Sidebar /> */}

      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
      
      <Toaster />
    </main>
  );
}

export default Layout;
