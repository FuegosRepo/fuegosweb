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
            src="/images/mariage/bgNew.jpeg"
            alt="Mariage Fuegos d'Azur"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="hero-overlay"></div>
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

              {/* Illustration: couple dancing */}
              <div className="bv-illo">
                <Image
                  src="/images/mariage-form/il-dancing-couple.png"
                  alt="Couple dancing illustration"
                  width={50}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
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
                {/* Illustration: champagne */}
                <div className="svc-illo">
                  <Image
                    src="/images/mariage-form/il-champagne.png"
                    alt="Champagne illustration"
                    width={36}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
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
                {/* Illustration: flames / brasero */}
                <div className="svc-illo">
                  <Image
                    src="/images/mariage-form/il-flames.png"
                    alt="Flames illustration"
                    width={44}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
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
                {/* Illustration: cake */}
                <div className="svc-illo">
                  <Image
                    src="/images/mariage-form/il-cake.png"
                    alt="Wedding cake illustration"
                    width={40}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
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

          {/* Illustration: château */}
          <div className="lieux-illo">
            <Image
              src="/images/mariage-form/il-chateau.png"
              alt="Château illustration"
              width={70}
              height={50}
              style={{ objectFit: 'contain' }}
            />
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

          {/* Illustration: fork & knife */}
          <div className="faq-illo">
            <Image
              src="/images/mariage-form/il-fork-knife.png"
              alt="Fork and knife illustration"
              width={46}
              height={50}
              style={{ objectFit: 'contain' }}
            />
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
          <Link href="/mariage/form" className="btn-outline">
            Demander un devis personnalisé
          </Link>
        </div>
      </section>
    </div>
  );
}
