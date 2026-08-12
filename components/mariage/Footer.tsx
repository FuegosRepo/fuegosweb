import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative">
      <div className="flex justify-center pt-6 pb-2 opacity-40">
        <Image
          src="/images/mariage/il-footer-waves.png"
          alt="Waves decoration"
          width={120}
          height={40}
          style={{ width: '100px', height: 'auto', objectFit: "contain" }}
        />
      </div>
      <div className="footer-grid">
        {/* Brand & CTA */}
        <div className="footer-brand">
          <Image
            src="/logo/logo-final.webp"
            alt="Fuegos d'Azur Mariages"
            width={90}
            height={90}
            className="logo-img"
            style={{ width: "auto", height: "90px", objectFit: "contain", margin: "0 auto 14px" }}
          />
          <span className="footer-brand-name">Fuegos d&apos;Azur Mariages</span>
          <span className="footer-brand-sub">French Riviera</span>
          <div className="mt-4">
            <Link href="/mariage/form" className="btn-outline text-xs px-4 py-2">
              Demander un devis
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <p>Contact</p>
          <p>
            <a href="mailto:mariages@fuegosdazur.com">mariages@fuegosdazur.com</a>
          </p>
          <p>
            <a href="tel:+33670659784">+33 6 70 65 97 84</a>
          </p>
          <div className="mt-3">
            <a 
              href="https://fuegosdazur.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs opacity-75 hover:opacity-100 underline decoration-amber-600/50"
            >
              Découvrir Fuegos d&apos;Azur — Traiteur événementiel
            </a>
          </div>
        </div>

        {/* Nav + Social */}
        <div className="footer-nav-col">
          <ul className="footer-nav-list">
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
              <Link href="#lieux">Lieux</Link>
            </li>
            <li>
              <Link href="/mariage/form">Demander un devis</Link>
            </li>
          </ul>
          <div className="footer-social">
            <a href="https://www.instagram.com/fuegosdazur/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/fuegosdazur" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-legal">
        © 2026 Fuegos d&apos;Azur Mariages — French Riviera ·{" "}
        <Link href="/mentions-legales">Mentions légales</Link>
      </p>
    </footer>
  );
}
