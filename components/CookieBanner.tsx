'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            setShowBanner(true)
        }
    }, [])

    const handleAccept = () => {
        // Update local storage
        localStorage.setItem('cookie-consent', 'accepted')

        // Push consent to GTM / Google Consent Mode
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            })
        }

        setShowBanner(false)
    }

    const handleRefuse = () => {
        // Update local storage
        localStorage.setItem('cookie-consent', 'refused')

        // Push consent update (ensure everything stays denied)
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
            })
        }

        setShowBanner(false)
    }

    if (!showBanner) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-stone-600 flex-1">
                    <p>
                        Nous utilisons des cookies pour optimiser votre expérience, analyser le trafic et personnaliser les publicités.
                        En cliquant sur « Accepter », vous consentez à l&apos;utilisation de ces cookies.
                        Vous pouvez consulter notre <Link href="/politique-cookies" className="text-[#e2943a] underline hover:text-orange-600">Politique de Cookies</Link> pour en savoir plus.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handleRefuse}
                        className="border-stone-300 text-stone-700 hover:bg-stone-100"
                    >
                        Refuser
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="bg-[#e2943a] hover:bg-orange-600 text-white"
                    >
                        Accepter
                    </Button>
                </div>
            </div>
        </div>
    )
}
