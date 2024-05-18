"use client";

import { navLinks } from '@/constants';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const Navbar = () => {
  const pathname = usePathname();

  const styles = {
    navbar: {
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '0.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.25rem',
      color: '#db2777',
      textDecoration: 'none',
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    nav: {
      display: 'flex',
      gap: '1rem',
    },
    navElement: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s, color 0.2s',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    navElementActive: {
      backgroundColor: '#db2777',
      color: '#fff',
    },
    navElementInactive: {
      color: '#db2777',
    },
    button: {
      padding: '0.5rem',
      fontSize: '0.875rem',
      backgroundColor: '#db2777',
      color: '#fff',
      transition: 'background-color 0.2s',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    buttonHover: {
      backgroundColor: '#ec4899',
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link href="/" style={styles.logo}>
        <h1 className='text-4xl '>Artify</h1>
      </Link>

      <div style={styles.navContainer}>
        <SignedIn>
          <ul style={styles.nav}>
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  style={{
                    ...styles.navElement,
                    ...(isActive ? styles.navElementActive : styles.navElementInactive),
                  }}
                >
                  <Link href={link.route} style={styles.navElement}>
                    {/* <Image
                      src={link.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      style={isActive ? { filter: 'brightness(200%)' } : {}}
                    /> */}
                    <span style={{ fontSize: '0.875rem' }}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul style={{ display: 'flex', gap: '1rem' }}>
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  style={{
                    ...styles.navElement,
                    ...(isActive ? styles.navElementActive : styles.navElementInactive),
                  }}
                >
                  <Link href={link.route} style={styles.navElement}>
                    <Image
                      src={link.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      style={isActive ? { filter: 'brightness(200%)' } : {}}
                    />
                    <span style={{ fontSize: '0.875rem' }}>{link.label}</span>
                  </Link>
                </li>
              );
            })}

            <li style={styles.navElement}>
              <UserButton afterSignOutUrl="/" showName />
            </li>
          </ul>
        </SignedIn>

        <SignedOut>
        <ul style={styles.nav}>
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  style={{
                    ...styles.navElement,
                    ...(isActive ? styles.navElementActive : styles.navElementInactive),
                  }}
                >
                  <Link href={"/sign-in"} style={styles.navElement}>
                    {/* <Image
                      src={link.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      style={isActive ? { filter: 'brightness(200%)' } : {}}
                    /> */}
                    <span style={{ fontSize: '0.875rem' }}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul style={{ display: 'flex', gap: '1rem' }}>
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  style={{
                    ...styles.navElement,
                    ...(isActive ? styles.navElementActive : styles.navElementInactive),
                  }}
                >
                  <Link href={"/sign-in"} style={styles.navElement}>
                    <Image
                      src={link.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      style={isActive ? { filter: 'brightness(200%)' } : {}}
                    />
                    <span style={{ fontSize: '0.875rem' }}>{link.label}</span>
                  </Link>
                </li>
              );
            })}

            <li style={styles.navElement}>
              <UserButton afterSignOutUrl="/" showName />
            </li>
          </ul>
          <Button asChild style={{ ...styles.button }}>
            <Link href="/sign-in" style={{ color: '#fff' }}>Login</Link>
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
