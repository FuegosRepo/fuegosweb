"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MariageHome() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [enableVideo, setEnableVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Solo montamos el video tras la hidratación y si el usuario no pidió
  // reducir el movimiento: así no descargamos 6 MB innecesariamente.
  useEffect(() => {
    setEnableVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Hacemos el fade-in cuando el video ya tiene frames para pintar.
  // No usamos "canplaythrough": varios navegadores no lo emiten nunca si
  // deciden no bufferear el archivo completo.
  useEffect(() => {
    const video = videoRef.current;
    if (!enableVideo || !video) return;

    const markReady = () => setVideoReady(true);

    // Si el video venía cacheado, el evento pudo dispararse antes de montar.
    if (video.readyState >= 2) markReady();

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("playing", markReady);

    // Algunos navegadores ignoran el atributo autoPlay cuando el elemento
    // se monta por JS; forzamos play() y absorbemos el rechazo.
    void video.play().catch(() => {});

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("playing", markReady);
    };
  }, [enableVideo]);

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
          {/* Capa base: imagen. Se muestra siempre y cubre el hero mientras
              el video descarga (y queda como fallback si no puede reproducirse). */}
          <Image
            src="/images/mariage/hero-bg.webp"
            alt="Fuegos d'Azur Mariages"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />

          {/* Capa superior: video decorativo. Arranca invisible y hace fade-in
              recién cuando ya hay frames decodificados para pintar. */}
          {enableVideo && (
          <video
            ref={videoRef}
            className={`hero-video ${videoReady ? "is-ready" : ""}`}
            src="/videos/mariage-hero.mp4"
            poster="/images/mariage/hero-bg.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
          )}
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
                  alt="Martín, chef et asador de Fuegos d'Azur Mariages"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="bv-accent relative">
                <Image
                  src="/images/mariage/IMG_1703.jpg"
                  alt="Logo Fuegos d'Azur Mariages brodé en doré"
                  fill
                  sizes="(max-width: 960px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Text (2 Paragraphs - Client Brief) */}
            <div className="bv-text">
              <p className="bv-para">
                Chez Fuegos d&apos;Azur, nous créons bien plus qu&apos;un repas : une véritable expérience autour du feu. La cuisson au brasero, en direct, est le cœur de votre réception — les flammes, les parfums et le geste de l&apos;asador créent une ambiance chaleureuse et élégante, où vos invités se retrouvent naturellement pour partager.
              </p>

              <div className="thin-rule"></div>

              <p className="bv-para">
                Notre cuisine est inspirée de nos racines argentines et uruguayennes, enrichie par des années d&apos;expérience en France. Des produits d&apos;exception, une cuisine sincère et un service fluide, pensé pour s&apos;intégrer harmonieusement à votre univers.
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
           SECTION 2.5 — LA SIGNATURE FUEGOS
           ============================================================ */}
      <section id="signature" className="section-pad" style={{ background: "var(--cream-alt)" }}>
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">La Signature Fuegos</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">Notre Engagement</p>
          </div>

          <div className="signature-grid">
            <div className="signature-card">
              <Image src="/images/mariage-form/il-flames.png" alt="Flames" width={90} height={90} style={{ width: '75px', height: '75px', objectFit: 'contain', opacity: 0.9 }} />
              <h3 className="signature-title">Cuisson au feu de bois</h3>
              <p className="signature-desc">L&apos;authenticité de l&apos;asado, le goût unique du feu.</p>
            </div>

            <div className="signature-card">
              <Image src="/images/mariage/il-chef.png" alt="Chef con boina" width={90} height={90} style={{ width: '78px', height: '78px', objectFit: 'contain', opacity: 0.9 }} />
              <h3 className="signature-title">Une expérience en direct</h3>
              <p className="signature-desc">L&apos;asador cuisine devant vos invités, au cœur de la réception.</p>
            </div>

            <div className="signature-card">
              <Image src="/images/mariage/il-ribs.png" alt="Costillar" width={90} height={90} style={{ width: '78px', height: '78px', objectFit: 'contain', opacity: 0.9 }} />
              <h3 className="signature-title">Produits sélectionnés</h3>
              <p className="signature-desc">Viandes d&apos;exception et produits de saison, choisis avec exigence.</p>
            </div>

            <div className="signature-card">
              <Image src="/images/mariage/il-service-sur-mesure.webp" alt="Copa de cóctel" width={239} height={371} style={{ width: 'auto', height: '84px', objectFit: 'contain', opacity: 0.9 }} />
              <h3 className="signature-title">Un service sur mesure</h3>
              <p className="signature-desc">Pensé pour votre lieu, votre format et votre histoire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 3 — NOS SERVICES (4 Blocks Experience)
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
            <p className="t-caps">Une Expérience Culinaire Sur Mesure</p>
          </div>

          <div className="svc-blocks-wrap">
            {/* 6.1 Apéritif & Entrées */}
            <div className="svc-exp-card">
              <div className="svc-exp-photo relative">
                <Image
                  src="/images/mariage/IMG_1712.jpg"
                  alt="Apéritif & Entrées en direct au brasero"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="svc-exp-content">
                <div className="svc-exp-illo mb-4">
                  <Image
                    src="/images/mariage/il-cocktail.png"
                    alt="Apéritif illustration"
                    width={100}
                    height={100}
                    style={{ width: '85px', height: '85px', objectFit: "contain", opacity: 0.9 }}
                  />
                </div>
                <h3 className="svc-exp-title">Apéritif &amp; Entrées</h3>
                <p className="svc-exp-desc">
                  Pendant le cocktail, nos entrées circulent en format finger food : des bouchées élégantes, préparées à la minute au brasero et à la plancha, servies au plus près de vos invités. Une première rencontre avec le feu, conviviale et raffinée.
                </p>
              </div>
            </div>

            {/* 6.2 Le Brasero — Plats principaux */}
            <div className="svc-exp-card reverse">
              <div className="svc-exp-photo relative">
                <Image
                  src="/images/mariage/IMG_1714.jpg"
                  alt="Le Brasero — Plats principaux de Fuegos d'Azur Mariages"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="svc-exp-content">
                <div className="svc-exp-illo mb-4">
                  <Image
                    src="/images/mariage/il-brasero-ribs.png"
                    alt="Brasero illustration"
                    width={100}
                    height={100}
                    style={{ width: '85px', height: '85px', objectFit: "contain", opacity: 0.9 }}
                  />
                </div>
                <h3 className="svc-exp-title">Le Brasero — Plats principaux</h3>
                <p className="svc-exp-desc">
                  Le moment signature. Les viandes sont cuites en direct, présentées et découpées face au brasero. Chacun choisit sa cuisson, échange avec l&apos;asador et vit le spectacle du feu de près.
                </p>
              </div>
            </div>

            {/* 6.3 Accompagnements */}
            <div className="svc-exp-card">
              <div className="svc-exp-photo relative">
                <Image
                  src="/images/mariage/IMG_1715.jpg"
                  alt="Accompagnements présentés en buffet chaleureux"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="svc-exp-content">
                <div className="svc-exp-illo mb-4">
                  <Image
                    src="/images/mariage/il-veggies.png"
                    alt="Accompagnements illustration"
                    width={100}
                    height={100}
                    style={{ width: '85px', height: '85px', objectFit: "contain", opacity: 0.9 }}
                  />
                </div>
                <h3 className="svc-exp-title">Accompagnements</h3>
                <p className="svc-exp-desc">
                  Les accompagnements sont présentés en buffet : une table généreuse et soignée, aux couleurs de saison, qui accompagne les viandes et s&apos;adapte à tous les goûts.
                </p>
              </div>
            </div>

            {/* 6.4 Desserts */}
            <div className="svc-exp-card reverse">
              <div className="svc-exp-photo relative">
                <Image
                  src="/images/mariage/IMG_1716.jpg"
                  alt="Desserts signature à la plancha pour mariage"
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="svc-exp-content">
                <div className="svc-exp-illo mb-4">
                  <Image
                    src="/images/mariage/il-wedding-cake.png"
                    alt="Desserts illustration"
                    width={100}
                    height={100}
                    style={{ width: '85px', height: '85px', objectFit: "contain", opacity: 0.9 }}
                  />
                </div>
                <h3 className="svc-exp-title">Desserts</h3>
                <p className="svc-exp-desc">
                  Pour clore le repas : nos desserts signature préparés en direct à la plancha, dont les incontournables panqueques au dulce de leche et crumble caramélisé de noix et spéculoos.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-amber-900/10" style={{ marginTop: "110px", paddingTop: "50px" }}>
            <p className="text-lg italic text-amber-900/80 mb-6">
              Chaque menu est composé sur mesure — découvrez nos propositions dans votre devis personnalisé.
            </p>
            <Link href="/mariage/form" className="btn-outline">
              Demander un devis personnalisé
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 3.5 — VIDEO (L'Ambiance en mouvement)
           ============================================================ */}
      <section id="video" className="section-pad video-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">En Mouvement</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">L&apos;Ambiance du Feu</p>
          </div>

          <div className="video-container">
            <video
              src="/video-historia/reel-fuegos-d-azur_QDgl6rhj.mp4"
              poster="/images/mariage/IMG_1714.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 4 — GALERIE
           ============================================================ */}
      <section id="galerie" className="section-pad">
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
                alt="Brasero chargé sous pergola de fer forgé — Fuegos d'Azur Mariages"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Brasero et Feu — French Riviera</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1707.jpg"
                alt="Chefs Fuegos d'Azur Mariages travaillant en equipo"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Équipe &amp; Savoir-faire</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1701.jpg"
                alt="Découpe des viandes en direct face aux invités"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Servicio y Découpe en direct</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1704.jpg"
                alt="Invitados disfrutando del ambiente de fiesta"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Invitations et Ambiance</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1709.jpg"
                alt="Décoration de table élégante et soignée pour mariage"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Mesas y Décoration de Fête</p>
              </div>
            </div>

            <div className="gallery-item relative">
              <Image
                src="/images/mariage/IMG_1705.jpg"
                alt="Domaine avec piscine et vue imprenable sur la Côte d'Azur"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="gallery-cap-wrap">
                <p className="gallery-cap">Villas &amp; Décors d&apos;Exception</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 5 — LIEUX D'EXCEPTION (Des lieux qui inspirent)
           ============================================================ */}
      <section id="lieux" className="section-pad">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Des lieux qui inspirent</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">Villas, Domaines &amp; Châteaux</p>
          </div>

          <div className="lieux-grid">
            <div className="lieu-card">
              <div className="lieu-photo relative">
                <Image
                  src="/images/mariage/IMG_1713.jpg"
                  alt="Villa avec piscine et cocktail exterior"
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="lieu-tag">Villas d&apos;Exception</p>
              <p className="lieu-name">Saint-Jean-Cap-Ferrat</p>
            </div>

            <div className="lieu-card">
              <div className="lieu-photo relative">
                <Image
                  src="/images/mariage/IMG_1717.jpg"
                  alt="Vue panoramique Méditerranée et pergola"
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="lieu-tag">Vue Méditerranée</p>
              <p className="lieu-name">Saint-Tropez &amp; Cannes</p>
            </div>

            <div className="lieu-card">
              <div className="lieu-photo relative">
                <Image
                  src="/images/mariage/IMG_1719.jpg"
                  alt="Atmosphère nocturne au château"
                  fill
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="lieu-tag">Châteaux &amp; Domaines</p>
              <p className="lieu-name">French Riviera</p>
            </div>
          </div>

          <div className="lieux-text-block">
            <p>
              De Saint-Jean-Cap-Ferrat à Saint-Tropez, nous installons nos braseros dans les plus beaux domaines, villas et châteaux de la Côte d&apos;Azur — et partout où votre histoire vous mène.
            </p>
          </div>

          {/* Illustration: château + montagnes */}
          <div className="lieux-illo">
            <Image
              src="/images/mariage/il-chateau-mountains.png"
              alt="Château et montagnes illustration"
              width={120}
              height={90}
              style={{ width: '95px', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 5.5 — TÉMOIGNAGES
           ============================================================ */}
      <section id="temoignages" className="section-pad">
        <div className="section-inner">
          <div className="section-header">
            <span className="t-script">Mots Doux</span>
            <div className="ornament">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z" fill="#C8820A" opacity="0.75" />
              </svg>
            </div>
            <p className="t-caps">Témoignages de nos Mariés</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                &ldquo;C&apos;était tout simplement parfait. La cuisson au brasero en direct devant nos invités a apporté une magie unique et chaleureuse à notre réception. Merci pour votre professionnalisme et votre gentillesse.&rdquo;
              </p>
              <p className="testimonial-author">Laure-Sophie V. — Mariage sur la Côte d&apos;Azur</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                &ldquo;Le cocktail et le repas brasero ont marqué tous nos invités. Un service impeccable, une viande d&apos;une tendreté exceptionnelle et une ambiance conviviale inoubliable pour notre mariage.&rdquo;
              </p>
              <p className="testimonial-author">Jenna T. — Mariage &amp; Brunch</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 6 — FAQ (Full French proposal from Client Brief)
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
            {/* Q1 */}
            <div className={`faq-item ${openFaq === 0 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(0)}>
                <span className="faq-q-text">Combien d&apos;invités pouvez-vous accueillir ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Nous travaillons pour des mariages de 20 à 300 convives. Chaque prestation est dimensionnée à la taille de votre événement.
                </p>
              </div>
            </div>

            {/* Q2 */}
            <div className={`faq-item ${openFaq === 1 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(1)}>
                <span className="faq-q-text">Où intervenez-vous ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Sur toute la Côte d&apos;Azur — de Monaco à Saint-Tropez — et au-delà sur demande.
                </p>
              </div>
            </div>

            {/* Q3 */}
            <div className={`faq-item ${openFaq === 2 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(2)}>
                <span className="faq-q-text">Que comprend votre service ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  L&apos;équipe de cuisine et de service, tout le matériel de cuisson, la mise en place et le déroulé complet du repas, de l&apos;apéritif au dessert.
                </p>
              </div>
            </div>

            {/* Q4 */}
            <div className={`faq-item ${openFaq === 3 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(3)}>
                <span className="faq-q-text">Comment fonctionne le brasero ? Est-ce adapté à tous les lieux ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Notre brasero est autonome et s&apos;installe en extérieur, sur la plupart des terrains. Nous validons l&apos;emplacement en amont avec vous et avec le lieu de réception.
                </p>
              </div>
            </div>

            {/* Q5 */}
            <div className={`faq-item ${openFaq === 4 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(4)}>
                <span className="faq-q-text">Quand arrivez-vous et combien de temps dure le service ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Nous arrivons plusieurs heures avant le début pour l&apos;installation et l&apos;allumage du feu. Le service s&apos;adapte ensuite au déroulé de votre journée.
                </p>
              </div>
            </div>

            {/* Q6 */}
            <div className={`faq-item ${openFaq === 5 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(5)}>
                <span className="faq-q-text">Que se passe-t-il en cas de pluie ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Nous prévoyons toujours une solution de repli avec vous et le lieu : espace couvert, tente ou adaptation du dispositif.
                </p>
              </div>
            </div>

            {/* Q7 */}
            <div className={`faq-item ${openFaq === 6 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(6)}>
                <span className="faq-q-text">Proposez-vous des options végétariennes ou adaptées aux restrictions alimentaires ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Oui. Tous nos menus s&apos;adaptent à vos besoins : végétarien, sans gluten, allergies alimentaires.
                </p>
              </div>
            </div>

            {/* Q8 */}
            <div className={`faq-item ${openFaq === 7 ? "open" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(7)}>
                <span className="faq-q-text">Fournissez-vous la vaisselle et le mobilier ?</span>
                <div className="faq-plus"></div>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">
                  Nous assurons tout le matériel de cuisson. Pour la vaisselle, le mobilier et la décoration, nous travaillons en coordination avec vos prestataires ou vous recommandons nos partenaires de confiance.
                </p>
              </div>
            </div>
          </div>

          {/* Illustration: fork & knife */}
          <div className="faq-illo">
            <Image
              src="/images/mariage-form/il-fork-knife.png"
              alt="Fork and knife illustration"
              width={80}
              height={80}
              style={{ width: '65px', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 7 — CTA / DEVIS
           ============================================================ */}
      <section id="cta">
        {/* Background photo */}
        <div className="cta-bg-img">
          <Image
            src="/images/mariage/IMG_1721.jpg"
            alt="Fuegos d'Azur Mariages"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", filter: "grayscale(0.4)" }}
          />
        </div>

        <div className="cta-inner">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/mariage/il-candelabra.png"
              alt="Candelabra illustration"
              width={90}
              height={90}
              style={{ width: '75px', height: '75px', objectFit: "contain", opacity: 0.9 }}
            />
          </div>
          <p className="cta-title">Écrivons votre histoire autour du feu</p>
          <p className="cta-sub">Fuegos d&apos;Azur Mariages · French Riviera</p>
          <p className="cta-body">
            Chaque mariage est unique. Racontez-nous votre projet et nous imaginerons ensemble une expérience culinaire sur mesure, autour du feu.
          </p>
          <Link href="/mariage/form" className="btn-outline">
            Demander un devis personnalisé
          </Link>
        </div>
      </section>

      {/* ============================================================
           SECTION 8 — PLAQUETA MARIAGES
           ============================================================ */}
      <section id="plaqueta" className="w-full px-6 md:px-12 flex justify-center items-center" style={{ background: "var(--dark)", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="w-full max-w-[1300px] mx-auto flex justify-center">
          <Image
            src="/images/mariage/plaqueta-mariages.webp"
            alt="Fuegos d'Azur Mariages Plaquette"
            width={1600}
            height={1000}
            sizes="(max-width: 768px) 100vw, 1300px"
            className="w-full h-auto object-contain rounded-[16px] overflow-hidden shadow-2xl"
            priority
          />
        </div>
      </section>
    </div>
  );
}
