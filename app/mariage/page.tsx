"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MariageHome() {
  const [activeTab, setActiveTab] = useState<"aperitif" | "viandes" | "dessert">("aperitif");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col">
      {/* ============================================================
           SECTION 1 — HERO
           ============================================================ */}
      <section id="hero">
        <div className="hero-bg">
          <Image
            src="/images/mariage/IMG_1710.jpg"
            alt="Chef Fuegos d'Azur au brasero sous pergola avec vue sur la mer Méditerranée"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-icon">
            <Image
              src="/logo/logo.webp"
              alt="Fuegos d'Azur"
              width={120}
              height={120}
              className="logo-img"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
          <span className="hero-name">Fuegos d&apos;Azur</span>
          <span className="hero-riviera">Mariages · French Riviera</span>
          <p className="hero-tagline">
            Une expérience culinaire unique autour du feu<br />
            pour célébrer le plus beau jour de votre vie.
          </p>
        </div>
      </section>

      {/* ============================================================
           SECTION 2 — BIENVENUE / L'EXPÉRIENCE FUEGOS
           ============================================================ */}
      <section id="bienvenue" className="section-pad">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Bienvenue</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">L&apos;Expérience Fuegos</p>
          </div>

          <div className="bv-grid">
            {/* Photos */}
            <div className="bv-photos">
              <div className="bv-main relative">
                <Image
                  src="/images/mariage/IMG_1708.jpg"
                  alt="Martín, chef et asador de Fuegos d'Azur, tablier croisé, terrasse avec vue mer"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="bv-accent relative">
                <Image
                  src="/images/mariage/IMG_1703.jpg"
                  alt="Logo Fuegos d'Azur brodé en doré sur la veste du chef, tablier de cuir croisé"
                  fill
                  sizes="(max-width: 960px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="bv-text">
              <p className="bv-para">
                Chez Fuegos d&apos;Azur, nous créons bien plus qu&apos;un repas,
                une véritable expérience autour du feu.
                Nous imaginons des moments chaleureux, élégants et profondément conviviaux,
                où les invités se retrouvent naturellement pour partager, échanger
                et vivre un instant spécial.
              </p>

              <div className="thin-rule"></div>

              <p className="bv-para">
                Au cœur de notre signature, la cuisson au brasero, en direct.
                Les flammes, les parfums et le geste de l&apos;asador donnent vie
                à une cuisine authentique — le feu devient un point de rencontre,
                une énergie vivante qui attire et crée une ambiance hors du commun.
              </p>

              <div className="thin-rule"></div>

              <p className="bv-para">
                Notre gastronomie est profondément inspirée de notre culture
                argentine et uruguayenne, que nous partageons avec passion,
                tout en l&apos;enrichissant de notre expérience au fil de nombreuses années en France.
                L&apos;art de vivre et la <em>buena vida</em> sont au cœur de notre cuisine.
              </p>

              <div className="thin-rule"></div>

              <p className="bv-para">
                Notre approche repose sur des valeurs simples mais essentielles.
                Produits de qualité, une cuisine sincère et passionnée.
                Un service fluide, élégant et adapté à chaque mariage.
              </p>

              <div className="thin-rule"></div>

              <p className="bv-para">
                Chaque prestation est pensée pour s&apos;intégrer harmonieusement
                à votre univers, afin de créer un moment mémorable où les saveurs,
                l&apos;ambiance et l&apos;art du partage se rencontrent.
              </p>

              {/* Line-art: couple dancing */}
              <div className="bv-illo">
                <svg width="90" height="110" viewBox="0 0 90 110" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Man */}
                  <circle cx="30" cy="13" r="7" stroke="#1C3FBF" strokeWidth="1.6" />
                  <line x1="30" y1="20" x2="30" y2="55" stroke="#1C3FBF" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M30 55 L22 78 M30 55 L38 78" stroke="#1C3FBF" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M30 32 L18 46 M30 32 L54 38" stroke="#1C3FBF" strokeWidth="1.6" strokeLinecap="round" />
                  {/* Woman */}
                  <circle cx="60" cy="13" r="7" stroke="#1C3FBF" strokeWidth="1.6" />
                  <path d="M60 20 L60 50" stroke="#1C3FBF" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M48 80 L60 50 L72 80 Q60 73 48 80Z" stroke="#1C3FBF" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
                  <path d="M60 32 L54 38 M60 32 L72 44" stroke="#1C3FBF" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 3 — NOS SERVICES
           ============================================================ */}
      <section id="services" className="section-pad">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Nos Services</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">Le Menu</p>
          </div>

          {/* Tab bar */}
          <div className="tabs-bar">
            <button
              className={`tab-btn ${activeTab === "aperitif" ? "active" : ""}`}
              onClick={() => setActiveTab("aperitif")}
            >
              Apéritif &amp; Entrées
            </button>
            <button
              className={`tab-btn ${activeTab === "viandes" ? "active" : ""}`}
              onClick={() => setActiveTab("viandes")}
            >
              Viandes &amp; Plat Principal
            </button>
            <button
              className={`tab-btn ${activeTab === "dessert" ? "active" : ""}`}
              onClick={() => setActiveTab("dessert")}
            >
              Accompagnements &amp; Dessert
            </button>
          </div>

          {/* ── Tab: Apéritif ── */}
          <div className={`tab-pane ${activeTab === "aperitif" ? "active" : ""}`} id="tab-aperitif">
            <div className="svc-grid">
              <div className="svc-photo relative">
                <Image
                  src="/images/mariage/IMG_1712.jpg"
                  alt="Chef avec tablier cuisinant des mini burgers sur la plancha, jardin en arrière-plan"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="svc-label">Apéritif &amp; Entrées</p>
                <ul className="svc-list">
                  <li>Mini burgers au brasero, sauce chimimayo maison / pain brioché</li>
                  <li>Brochettes de jambon Ibérique, melon, tomate, mozzarella, basilic</li>
                </ul>
                {/* Line-art: champagne flute */}
                <div className="svc-illo">
                  <svg width="46" height="82" viewBox="0 0 46 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6 L32 6 L27.5 44 L25.5 50 L25.5 70 L34 74 L12 74 L20.5 70 L20.5 50 L18.5 44 Z" stroke="#1C3FBF" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="23" cy="26" r="1.8" stroke="#1C3FBF" strokeWidth="1.2" />
                    <circle cx="20" cy="36" r="1.3" stroke="#1C3FBF" strokeWidth="1.2" />
                    <circle cx="26" cy="31" r="1.5" stroke="#1C3FBF" strokeWidth="1.2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tab: Viandes ── */}
          <div className={`tab-pane ${activeTab === "viandes" ? "active" : ""}`} id="tab-viandes">
            <div className="svc-grid">
              <div>
                <p className="svc-label">Viandes &amp; Plat Principal</p>
                <ul className="svc-list">
                  <li>Ojo de bife / Entrecôte Argentine</li>
                  <li>Tomahawk France</li>
                  <li>Saumon sauvage mariné au brasero</li>
                  <li>Sauces : Chimichurri &amp; Criolla</li>
                </ul>
                {/* Line-art: brasero / grill */}
                <div className="svc-illo">
                  <svg width="80" height="66" viewBox="0 0 80 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="32" width="64" height="7" rx="1.5" stroke="#1C3FBF" strokeWidth="1.5" />
                    <path d="M14 32C14 24 19 20 25 23 31 27 37 19 43 23 49 27 55 19 61 22 61 26 61 32 61 32" stroke="#1C3FBF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M20 39 L16 60 M60 39 L64 60" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M24 39 C23 44 26 49 24 54" stroke="#C8820A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
                    <path d="M40 39 C39 46 42 51 40 57" stroke="#C8820A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
                    <path d="M56 39 C55 44 58 49 56 54" stroke="#C8820A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
                  </svg>
                </div>
              </div>
              <div className="svc-photo relative">
                <Image
                  src="/images/mariage/IMG_1714.jpg"
                  alt="Chef au brasero avec saumon citron, viandes et pommes de terre, fumée ascendante, invités en arrière-plan"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* ── Tab: Accompagnements & Dessert ── */}
          <div className={`tab-pane ${activeTab === "dessert" ? "active" : ""}`} id="tab-dessert">
            <div className="svc-grid">
              <div className="svc-photo relative">
                <Image
                  src="/images/mariage/IMG_1715.jpg"
                  alt="Brasero chargé avec zucchini, pommes de terre et viandes, flammes visibles, pince en action"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="svc-label">Accompagnements &amp; Dessert</p>
                <ul className="svc-list">
                  <li>Pommes de terre Rústicas en persillade</li>
                  <li>Salade verte, pêches, fromage feta, pignons de pin et vinaigrette</li>
                  <li>Caviar d&apos;aubergines braisées</li>
                  <li>Panqueques con dulce de leche à la plancha, fruits de saison, crème maison et mesclun caramelisé de noix &amp; spéculoos</li>
                </ul>
                {/* Line-art: wedding cake */}
                <div className="svc-illo">
                  <svg width="64" height="82" viewBox="0 0 64 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="55" width="24" height="18" rx="1" stroke="#1C3FBF" strokeWidth="1.5" />
                    <rect x="12" y="37" width="40" height="18" rx="1" stroke="#1C3FBF" strokeWidth="1.5" />
                    <rect x="4" y="19" width="56" height="18" rx="1" stroke="#1C3FBF" strokeWidth="1.5" />
                    <line x1="32" y1="19" x2="32" y2="10" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M32 6C31 8 29 9 29.5 11 30 12 31 12.5 32 13 33 12.5 34 12 34.5 11 35 9 33 8 32 6Z" fill="#C8820A" opacity="0.8" />
                    <circle cx="24" cy="46" r="2" stroke="#1C3FBF" strokeWidth="1.2" />
                    <circle cx="40" cy="46" r="2" stroke="#1C3FBF" strokeWidth="1.2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 4 — GALERIE
           ============================================================ */}
      <section id="galerie">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Galerie</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.9" />
              </svg>
            </div>
            <p className="t-caps">Moments partagés</p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1700.jpg"
                alt="Brasero chargé sous pergola de fer forgé avec vue sur la mer"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Ambiance chaleureuse — French Riviera</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1701.jpg"
                alt="Chef de dos avec tablier de cuir, brasero chargé, palmiers"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">L&apos;art du feu — Service exclusif</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1704.jpg"
                alt="Équipe Fuegos d'Azur en terrasse avec vue sur la mer"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Partage et convivialité — Côte d&apos;Azur</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1705.jpg"
                alt="Venue avec piscine à débordement, jardin et montagnes en arrière-plan"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Gastronomie en direct — Moments magiques</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1707.jpg"
                alt="Deux chefs avec tabliers travaillant ensemble sur la plancha"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Savoir-faire et précision — Chefs Passionnés</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1709.jpg"
                alt="Décoration de table avec vaisselle élégante, bougies et fleurs"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Élégance et soin du détail — La table de fête</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 5 — LIEUX D'EXCEPTION
           ============================================================ */}
      <section id="lieux" className="section-pad">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Lieux d&apos;Exception</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">Côte d&apos;Azur</p>
          </div>

          <div className="lieux-grid">
            {/* Venue 1 */}
            <div className="lieu-card">
              <div className="lieu-photo relative">
                <Image
                  src="/images/mariage/IMG_1713.jpg"
                  alt="Villa avec piscine à débordement, jardin et cocktail tables"
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="lieu-tag">Villa &amp; Domaine</p>
              <p className="lieu-name">Jardins &amp; Piscines</p>
            </div>

            {/* Venue 2 */}
            <div className="lieu-card">
              <div className="lieu-photo relative">
                <Image
                  src="/images/mariage/IMG_1717.jpg"
                  alt="Pergola de fer forgé avec fleurs oranges et vue sur la mer Méditerranée"
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="lieu-tag">Vue Méditerranée</p>
              <p className="lieu-name">French Riviera</p>
            </div>

            {/* Venue 3 */}
            <div className="lieu-card">
              <div className="lieu-photo relative">
                <Image
                  src="/images/mariage/IMG_1719.jpg"
                  alt="Brasero sous pergola de fer forgé — atmosphère de soirée élégante"
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="lieu-tag">Château &amp; Pergola</p>
              <p className="lieu-name">Lieux d&apos;Exception</p>
            </div>
          </div>

          <div className="lieux-text-block">
            <p>Nous intervenons dans les plus beaux domaines de la Côte d&apos;Azur :</p>
            <p className="lieux-venues">
              Château de Vence · Villa Ephrussi de Rothschild<br />
              Domaine de la Rose · et bien d&apos;autres lieux sur demande
            </p>
          </div>

          {/* Line-art: château */}
          <div className="lieux-illo">
            <svg width="140" height="80" viewBox="0 0 140 80" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="28" y="38" width="84" height="36" stroke="#1C3FBF" strokeWidth="1.5" />
              <path d="M22 38 L70 10 L118 38" stroke="#1C3FBF" strokeWidth="1.5" fill="none" />
              <rect x="38" y="48" width="14" height="12" stroke="#1C3FBF" strokeWidth="1.2" />
              <rect x="88" y="48" width="14" height="12" stroke="#1C3FBF" strokeWidth="1.2" />
              <path d="M62 74 L62 58 Q70 54 78 58 L78 74" stroke="#1C3FBF" strokeWidth="1.5" fill="none" />
              <rect x="88" y="22" width="10" height="14" stroke="#1C3FBF" strokeWidth="1.5" />
              <rect x="22" y="28" width="14" height="10" stroke="#1C3FBF" strokeWidth="1.2" />
              <rect x="104" y="28" width="14" height="10" stroke="#1C3FBF" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 6 — FAQ
           ============================================================ */}
      <section id="faq" className="section-pad">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Questions fréquentes</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">FAQ</p>
          </div>

          <div className="faq-wrap">
            <div className={`faq-item ${openFaq === 0 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(0)}>
                <span className="faq-q-text">Combien de convives pouvez-vous accueillir ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Nous travaillons pour des mariages de 20 à 300 personnes.
                  Chaque prestation est adaptée à la taille de votre événement.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 1 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(1)}>
                <span className="faq-q-text">Fournissez-vous la vaisselle et le mobilier ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Nous assurons tout le matériel de cuisson. Pour la vaisselle, le mobilier et la décoration,
                  nous pouvons travailler en coordination avec vos prestataires ou vous recommander
                  nos partenaires de confiance.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 2 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(2)}>
                <span className="faq-q-text">Proposez-vous des menus végétariens ou avec restrictions alimentaires ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Absolument. Nous adaptons todos nos menus à vos besoins spécifiques :
                  végétarien, sans gluten, allergies alimentaires.
                  Contactez-nous pour un devis personnalisé.
                </p>
              </div>
            </div>
          </div>

          {/* Line-art: utensils */}
          <div className="faq-illo">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
              <line x1="28" y1="10" x2="28" y2="80" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="22" y1="10" x2="22" y2="30" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="34" y1="10" x2="34" y2="30" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 30 Q28 38 34 30" stroke="#1C3FBF" strokeWidth="1.5" fill="none" />
              <line x1="45" y1="10" x2="45" y2="80" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="45" cy="22" rx="7" ry="11" stroke="#1C3FBF" strokeWidth="1.5" />
              <line x1="62" y1="10" x2="62" y2="80" stroke="#1C3FBF" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M62 10 Q74 16 72 34 Q71 40 62 44" stroke="#1C3FBF" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 7 — CTA / DEVIS
           ============================================================ */}
      <section id="cta">
        {/* Background photo (very faint) */}
        <div className="cta-bg-img">
          <Image
            src="/images/mariage/IMG_1721.jpg"
            alt="Faint background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", filter: "grayscale(1)" }}
          />
        </div>

        <div className="cta-inner">
          <p className="cta-title">Créons votre moment</p>
          <p className="cta-sub">Mariages · French Riviera</p>
          <p className="cta-body">
            Chaque mariage est unique. Parlez-nous de votre projet
            et nous créerons ensemble une expérience culinaire sur mesure,
            autour du feu.
          </p>
          <Link href="/form" className="btn-outline">
            Demander un devis personnalisé
          </Link>
        </div>
      </section>
    </div>
  );
}
