import Link from 'next/link'
import ModernNavigation from '@/components/modern-navigation'
import { Footer } from '@/components/ui/footer'

export default function PolitiqueCookies() {
    return (
        <div className="min-h-screen bg-stone-50">
            <ModernNavigation />
            <div className="container mx-auto px-4 py-12 md:py-20 text-stone-800">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#e2943a]">Politique de Cookies</h1>

                <div className="space-y-8 max-w-4xl">
                    <section>
                        <p>
                            Cette politique explique comment nous utilisons les cookies et les technologies similaires sur notre site internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
                        <p>
                            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, mobile) lors de la visite d&apos;un site.
                            Il permet de conserver des données utilisateur afin de faciliter la navigation et de permettre certaines fonctionnalités.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">2. Les cookies que nous utilisons</h2>

                        <h3 className="text-xl font-medium mb-2 mt-4 text-stone-700">Cookies strictement nécessaires</h3>
                        <p className="mb-2">
                            Ces cookies sont indispensables au bon fonctionnement du site (ex: mémorisation de votre choix de consentement). Ils ne peuvent pas être désactivés.
                        </p>

                        <h3 className="text-xl font-medium mb-2 mt-4 text-stone-700">Cookies de mesure d&apos;audience (Google Analytics)</h3>
                        <p className="mb-2">
                            Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site (pages visitées, temps passé, etc.) afin d&apos;en améliorer les performances.
                        </p>

                        <h3 className="text-xl font-medium mb-2 mt-4 text-stone-700">Cookies publicitaires (Google Ads)</h3>
                        <p className="mb-2">
                            Ces cookies peuvent être mis en place par nos partenaires publicitaires. Ils peuvent être utilisés pour établir un profil de vos intérêts et vous proposer des publicités pertinentes sur d&apos;autres sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">3. Gestion de vos préférences</h2>
                        <p className="mb-4">
                            Lors de votre première visite, un bandeau vous informe de la présence de cookies et vous invite à indiquer votre choix.
                            Vous pouvez à tout moment modifier vos préférences ou retirer votre consentement en [mécanisme pour ré-ouvrir le bandeau, ex: cliquant sur le lien &quot;Gestion des cookies en bas de page&quot; - À implémenter].
                        </p>
                        <p>
                            Vous pouvez également configurer votre navigateur pour refuser systématiquement les cookies.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
