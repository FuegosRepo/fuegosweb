import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        {/* Contact */}
        <div className="footer-contact">
          <p>Contact</p>
          <p>
            <a href="mailto:mariages@fuegosdazur.com">mariages@fuegosdazur.com</a>
          </p>
          <p>
            <a href="tel:+33670659784">+33 6 70 65 97 84</a>
          </p>
        </div>

        {/* Brand */}
        <div className="footer-brand">
          <Image
            src="/logo/logo.webp"
            alt="Fuegos d'Azur"
            width={48}
            height={48}
            className="logo-img"
            style={{ width: "auto", height: "48px", objectFit: "contain", margin: "0 auto 14px" }}
          />
          <span className="footer-brand-name">Fuegos d&apos;Azur</span>
          <span className="footer-brand-sub">Mariages · French Riviera</span>
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
              <Link href="/form">Devis</Link>
            </li>
          </ul>
          <div className="footer-social">
            <a href="https://www.instagram.com/fuegosdazur/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/fuegosdazur" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <p className="footer-legal">
        © {new Date().getFullYear()} Fuegos d&apos;Azur — Mariages · French Riviera ·{" "}
        <Link href="/mentions-legales">Mentions légales</Link>
      </p>
    </footer>
  );
}
