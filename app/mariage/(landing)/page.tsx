import Image from 'next/image'
import Link from 'next/link'
import { HeroVideo } from '@/components/mariage/HeroVideo'
import { FaqList } from '@/components/mariage/FaqList'
import { Illo } from '@/components/mariage/Illo'
import {
  BIENVENUE,
  CTA,
  EQUIPE,
  FAQ,
  GALLERY,
  HERO,
  HIGHLIGHT_QUOTE,
  ICONS,
  LIEUX,
  NBSP,
  NNBSP,
  REEL,
  SERVICES,
  SIGNATURE,
  TESTIMONIALS,
} from './content'

// Server Component: solo el video del hero y el acordeón de la FAQ son
// interactivos, el resto se renderiza en el servidor y no suma JS al cliente.

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path
          d="M9 0C8.2 3 6 4.2 6.8 7C7.2 8.6 8 9.5 9 10C10 9.5 10.8 8.6 11.2 7C12 4.2 9.8 3 9 0Z"
          fill="#C8820A"
          opacity="0.75"
        />
      </svg>
    </div>
  )
}

function SectionHeader({ script, caps }: { script: string; caps: string }) {
  return (
    <div className="section-header">
      <h2 className="t-script">{script}</h2>
      <Ornament />
      <p className="t-caps">{caps}</p>
    </div>
  )
}

export default function MariageHome() {
  return (
    <div className="w-full flex flex-col">
      {/* ============================================================
           HERO — foto siempre visible + video (una vez) + contenido
           ============================================================ */}
      <section id="hero">
        <div className="hero-bg" aria-hidden="true">
          <Image
            src={HERO.poster.src}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: HERO.poster.focus }}
          />
          <HeroVideo src={HERO.video} />
          <div className="hero-veil" />
        </div>

        <div className="hero-content">
          <Image
            src={HERO.logo.src}
            alt="Fuegos d'Azur Mariages — French Riviera"
            width={HERO.logo.width}
            height={HERO.logo.height}
            priority
            className="hero-logo"
          />
          <h1 className="hero-title">{HERO.title}</h1>
          <p className="hero-tagline">{HERO.subtitle}</p>
          <Link href="/mariage/form" className="btn-outline hero-cta">
            {HERO.cta}
          </Link>
          <p className="hero-trust">
            {HERO.trust.map((item, i) => (
              <span key={item}>
                {i > 0 && <span className="hero-trust-dot"> · </span>}
                {item}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Testimonio destacado, justo después del hero */}
      <section className="quote-band" aria-label="Témoignage">
        <blockquote>
          <p className="quote-band-text">
            «{NNBSP}
            {HIGHLIGHT_QUOTE.quote}
            {NNBSP}»
          </p>
          {/* <p> y no <footer>: el CSS de la página estiliza todo `footer` como el pie de página */}
          <p className="quote-band-author">— {HIGHLIGHT_QUOTE.author}</p>
        </blockquote>
      </section>

      {/* ============================================================
           BIENVENUE / L'EXPÉRIENCE FUEGOS
           ============================================================ */}
      <section id="bienvenue" className="section-pad">
        <div className="section-inner">
          <SectionHeader script="Bienvenue" caps="L'Expérience Fuegos" />

          <div className="bv-grid">
            <div className="bv-photos">
              <div className="bv-main relative">
                <Image
                  src={BIENVENUE.main.src}
                  alt={BIENVENUE.main.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="bv-accent relative">
                <Image
                  src={BIENVENUE.accent.src}
                  alt={BIENVENUE.accent.alt}
                  fill
                  sizes="(max-width: 960px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className="bv-text">
              <p className="bv-para">
                Chez Fuegos d&apos;Azur, nous créons bien plus qu&apos;un repas{NNBSP}: une véritable
                expérience autour du feu. La cuisson au brasero, en direct, est le cœur de votre
                réception — les flammes, les parfums et le geste de l&apos;asador créent une ambiance
                chaleureuse et élégante, où vos invités se retrouvent naturellement pour{NBSP}partager.
              </p>

              <div className="thin-rule" />

              <p className="bv-para">
                Notre cuisine est inspirée de nos racines argentines et uruguayennes, enrichie par des
                années d&apos;expérience en France. Des produits d&apos;exception, une cuisine sincère
                et un service fluide, pensé pour s&apos;intégrer harmonieusement à votre{NBSP}univers.
              </p>

              <Illo icon={ICONS.couple} variant="deco" base={110} className="bv-illo" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           LA SIGNATURE FUEGOS
           ============================================================ */}
      <section id="signature" className="section-pad" style={{ background: 'var(--cream-alt)' }}>
        <div className="section-inner">
          <SectionHeader script="La Signature Fuegos" caps="Notre Engagement" />

          <div className="signature-grid">
            {SIGNATURE.map((item) => (
              <div key={item.title} className="signature-card">
                <Illo icon={item.icon} base={64} />
                <h3 className="signature-title">{item.title}</h3>
                <p className="signature-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           NOS SERVICES
           ============================================================ */}
      <section id="services" className="section-pad">
        <div className="section-inner">
          <SectionHeader script="Nos Services" caps="Une Expérience Culinaire Sur Mesure" />

          <div className="svc-blocks-wrap">
            {SERVICES.map((svc, i) => (
              <div key={svc.title} className={`svc-exp-card ${i % 2 ? 'reverse' : ''}`}>
                <div className="svc-exp-photo relative">
                  <Image
                    src={svc.photo.src}
                    alt={svc.photo.alt}
                    fill
                    sizes="(max-width: 960px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: svc.photo.focus }}
                  />
                </div>
                <div className="svc-exp-content">
                  <Illo icon={svc.icon} base={72} />
                  <h3 className="svc-exp-title">{svc.title}</h3>
                  <p className="svc-exp-desc">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="svc-cta">
            <p className="svc-cta-text">
              Chaque menu est composé sur mesure — découvrez nos propositions dans votre devis{NBSP}personnalisé.
            </p>
            <Link href="/mariage/form" className="btn-outline">
              Demander un devis personnalisé
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
           VIDEO — no se descarga hasta que el visitante le da play
           ============================================================ */}
      <section id="video" className="section-pad video-section">
        <div className="section-inner">
          <SectionHeader script="En Mouvement" caps="L'Ambiance du Feu" />

          <div className={`video-container ${REEL.vertical ? 'is-vertical' : ''}`}>
            <video src={REEL.src} poster={REEL.poster} controls playsInline preload="none" />
          </div>
        </div>
      </section>

      {/* ============================================================
           GALERIE — cada foto en su proporción, sin recorte cuadrado
           ============================================================ */}
      <section id="galerie" className="section-pad">
        <div className="section-inner">
          <SectionHeader script="Galerie" caps="Moments partagés" />

          <div className="gallery-grid">
            {GALLERY.map((photo) => (
              <figure key={photo.caption} className="gallery-item">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                />
                <figcaption className="gallery-cap-wrap">
                  <span className="gallery-cap">{photo.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           LIEUX
           ============================================================ */}
      <section id="lieux" className="section-pad">
        <div className="section-inner">
          <SectionHeader script="Des lieux qui inspirent" caps="Villas, Domaines & Châteaux" />

          <div className="lieux-grid">
            {LIEUX.map((lieu) => (
              <div key={lieu.tag} className="lieu-card">
                <div className="lieu-photo relative">
                  <Image
                    src={lieu.src}
                    alt={lieu.alt}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: lieu.focus }}
                  />
                </div>
                <p className="lieu-tag">{lieu.tag}</p>
                <p className="lieu-name">{lieu.name}</p>
              </div>
            ))}
          </div>

          <div className="lieux-text-block">
            <p>
              De Saint-Jean-Cap-Ferrat à Saint-Tropez, nous installons nos braseros dans les plus beaux
              domaines, villas et châteaux de la Côte d&apos;Azur — et partout où votre histoire
              vous{NBSP}mène.
            </p>
          </div>

          <Illo icon={ICONS.chateau} variant="deco" base={110} className="lieux-illo" />
        </div>
      </section>

      {/* ============================================================
           QUI SOMMES-NOUS — Les hommes derrière le feu
           ============================================================ */}
      <section id="equipe" className="section-pad">
        <div className="section-inner equipe-grid">
          <div className="equipe-photo relative">
            <Image
              src={EQUIPE.photo.src}
              alt={EQUIPE.photo.alt}
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="equipe-text">
            <h2 className="equipe-title t-script">{EQUIPE.title}</h2>
            <Ornament />
            <p className="equipe-para">{EQUIPE.text}</p>
          </div>
        </div>
      </section>

      {/* ============================================================
           TÉMOIGNAGES
           ============================================================ */}
      <section id="temoignages" className="section-pad">
        <div className="section-inner">
          <SectionHeader script="Mots Doux" caps="Témoignages de nos Mariés" />

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="testimonial-card">
                <blockquote className="testimonial-quote">
                  «{NNBSP}
                  {t.quote}
                  {NNBSP}»
                </blockquote>
                <figcaption className="testimonial-author">{t.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           FAQ
           ============================================================ */}
      <section id="faq" className="section-pad">
        <div className="section-inner">
          <SectionHeader script="Questions fréquentes" caps="FAQ" />
          <FaqList items={FAQ} />
          <Illo icon={ICONS.couverts} variant="deco" base={110} className="faq-illo" />
        </div>
      </section>

      {/* ============================================================
           CTA / DEVIS
           ============================================================ */}
      <section id="cta">
        <div className="cta-bg-img" aria-hidden="true">
          <Image src={CTA.photo.src} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>

        <div className="cta-inner">
          <Illo icon={ICONS.candelabre} variant="deco" base={110} className="cta-illo" />
          <h2 className="cta-title">Écrivons votre histoire autour du feu</h2>
          <p className="cta-sub">Fuegos d&apos;Azur Mariages · French Riviera</p>
          <p className="cta-body">
            Chaque mariage est unique. Racontez-nous votre projet et nous imaginerons ensemble une
            expérience culinaire sur mesure, autour du{NBSP}feu.
          </p>
          <Link href="/mariage/form" className="btn-outline">
            Demander un devis personnalisé
          </Link>
        </div>
      </section>

      {/* ============================================================
           PLAQUETTE MARIAGES
           ============================================================ */}
      <section
        id="plaqueta"
        className="w-full px-6 md:px-12 flex justify-center items-center"
        style={{ background: 'var(--dark)', paddingTop: '64px', paddingBottom: '64px' }}
      >
        <div className="w-full max-w-[1300px] mx-auto flex justify-center">
          <Image
            src="/images/mariage/plaqueta-mariages.webp"
            alt="Plaquette Fuegos d'Azur Mariages"
            width={1600}
            height={1000}
            sizes="(max-width: 768px) 100vw, 1300px"
            className="w-full h-auto object-contain rounded-[16px] overflow-hidden shadow-2xl"
          />
        </div>
      </section>
    </div>
  )
}
