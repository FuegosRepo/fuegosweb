'use client'

import { useState, useEffect, memo } from 'react'
import { Button } from "@/components/ui/button"
import { Phone, Mail, Menu, X, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavigationProps {
  currentPage?: string
}

function ModernNavigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Setup navigation
  }, [])

  const navigationItems = [
    { href: "/", label: "Accueil", active: currentPage === "home" },
    { href: "/notre-histoire", label: "Notre Histoire", active: currentPage === "histoire" },
    { href: "/service-traiteur", label: "Service Traiteur", active: currentPage === "services" },
    { href: "/faq", label: "FAQ", active: currentPage === "faq" }
  ]

  return (
    <>
      {/* Main Navigation */}
      <header 
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-black text-white shadow-lg"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/">
                <Image 
                  src="/logo/logoheader.png" 
                  alt="Fuegos d'Azur" 
                  width={220} 
                  height={110} 
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 220px, 220px"
                  className="h-20 sm:h-24 w-auto object-contain"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full font-medium transition-all duration-300 relative block",
                      item.active
                        ? "text-[#e2943a] bg-gray-800"
                        : "text-white hover:text-[#e2943a] hover:bg-gray-800"
                    )}
                  >
                    {item.label}
                    {item.active && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#e2943a] rounded-full"
                        layoutId="activeIndicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ x: "-50%" }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <Link href="/catering">
                <Button 
                  variant="brandOutlineLight"
                  className="px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-2"
                >
                  DEVIS PERSONNALISÉ
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-white z-60"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden absolute top-full left-0 right-0 z-40 shadow-lg"
              role="navigation"
              aria-label="Menu de navigation mobile"
            >
              <div className="container mx-auto px-4 py-6">
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                          item.active
                            ? "text-[#e2943a] bg-orange-50"
                            : "text-gray-700 hover:text-[#e2943a] hover:bg-orange-50"
                        )}
                        aria-label={`Aller à ${item.label}`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Contact Information for Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigationItems.length * 0.1 }}
                    className="pt-6 border-t border-gray-100"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                      Contact
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#e2943a] flex-shrink-0" />
                        <a
                          href="tel:0750853599"
                          className="text-gray-700 hover:text-[#e2943a] transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          07 50 85 35 99
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#e2943a] flex-shrink-0" />
                        <a
                          href="mailto:contact@fuegosdazur.fr"
                          className="text-gray-700 hover:text-[#e2943a] transition-colors text-sm break-all"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          contact@fuegosdazur.fr
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#e2943a] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">
                          Côte d&apos;Azur, France
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navigationItems.length + 1) * 0.1 }}
                    className="pt-4 border-t border-gray-100"
                  >
                    <Link href="/service-traiteur" onClick={() => setIsMenuOpen(false)} aria-label="Demander un devis personnalisé">
                      <Button variant="brandOutlineLight" className="w-full font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        DEVIS PERSONNALISÉ
                      </Button>
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export default memo(ModernNavigation)