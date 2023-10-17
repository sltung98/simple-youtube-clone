'use client';

import Link from "next/link";
import SignIn from "./sign-in";
import Upload from "./upload";

import styles from "./navbar.module.css";

import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../utils/firebase/firebase";
import { User } from "firebase/auth";



function NavBar() {
  // Initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [] /* No dependencies, never rerun */);


  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.logoContainer}>
          <img width={90} height={20} className={styles.logo} src="/youtube-logo.svg" alt="YouTube Logo" />
        </span>
      </Link>
      {
        user && <Upload />
      }
      <SignIn user={user} />
    </nav>
  );
}

export default NavBar;
