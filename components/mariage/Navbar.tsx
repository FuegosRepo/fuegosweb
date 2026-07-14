"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      <nav id="nav" className={`${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
        <Link href="#hero" className="nav-brand" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo/logo.webp"
            alt="Fuegos d'Azur"
            width={80}
            height={80}
            className="logo-img"
            style={{ width: "auto", height: "80px", objectFit: "contain" }}
          />
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className="nav-links">
          <li>
            <Link href="#bienvenue" onClick={() => setIsMenuOpen(false)}>L&apos;Expérience</Link>
          </li>
          <li>
            <Link href="#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          </li>
          <li>
            <Link href="#galerie" onClick={() => setIsMenuOpen(false)}>Galerie</Link>
          </li>
          <li>
            <Link href="/mariage/form" className="nav-cta" onClick={() => setIsMenuOpen(false)}>
              Devis personalizado
            </Link>
          </li>
        </ul>
      </nav>

      {/* Backdrop overlay for mobile menu drawer */}
      {isMenuOpen && (
        <div className="nav-backdrop" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
}
