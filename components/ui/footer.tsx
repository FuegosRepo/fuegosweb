import { memo } from 'react'
import { OptimizedImage } from './optimized-image'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import { COMPANY_INFO, CONTACT_INFO, NAVIGATION_LINKS } from '@/lib/constants'

function FooterComponent() {
  return (
    <footer className="bg-stone-900 text-white py-8 sm:py-12 lg:py-16" role="contentinfo" aria-label="Informations de contact et navigation">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Logo et Description */}
          <div className="lg:col-span-2 text-center">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <OptimizedImage 
                src={COMPANY_INFO.logo}
                alt={COMPANY_INFO.name}
                width={200} 
                height={100} 
                className="mx-auto"
                imageClassName="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                sizes="200px"
                quality={90}
                placeholder="blur"
              />
            </div>
            <div className="mx-auto max-w-lg sm:max-w-xl">
              <p className="text-gray-300 mb-3 sm:mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
                {COMPANY_INFO.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-0">
                {COMPANY_INFO.founders.map((name) => (
                  <span
                    key={name}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-gray-700 bg-stone-800/50 text-gray-300 text-xs"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6" style={{ color: 'var(--color-custom-brown)' }}>
              Navigation
            </h4>
              <nav aria-label="Navigation du pied de page">
              <ul className="space-y-2 sm:space-y-3">
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-stone-900 rounded inline-block py-1"
                      aria-label={`Aller à ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6" style={{ color: 'var(--color-custom-brown)' }}>
              Contact
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {Object.values(CONTACT_INFO.phones).map((phone, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 justify-center">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-custom-brown)' }} />
                  <a 
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-stone-900 rounded"
                    aria-label={`Appeler ${phone}`}
                  >
                    {phone}
                  </a>
                </div>
              ))}
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-custom-brown)' }} />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-xs sm:text-sm lg:text-base text-gray-300 break-all hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-stone-900 rounded"
                  aria-label={`Envoyer un email à ${CONTACT_INFO.email}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Separador y Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 lg:pt-12 text-center">
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
