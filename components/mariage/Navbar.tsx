"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""}>
      <Link href="#hero" className="nav-brand">
        <Image
          src="/logo/logo.webp"
          alt="Fuegos d'Azur"
          width={34}
          height={34}
          className="logo-img"
          style={{ width: "auto", height: "34px", objectFit: "contain" }}
        />
        <span className="nav-brand-name">Fuegos d&apos;Azur</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="#bienvenue">L&apos;Expérience</Link>
        </li>
        <li>
          <Link href="#services">Services</Link>
        </li>
        <li>
          <Link href="#galerie">Galerie</Link>
        </li>
        <li>
          <Link href="/form" className="nav-cta">
            Devis personnalisé
          </Link>
        </li>
      </ul>
    </nav>
  );
}
