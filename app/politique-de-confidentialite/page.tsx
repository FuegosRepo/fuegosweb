import Link from 'next/link'
import ModernNavigation from '@/components/modern-navigation'
import { Footer } from '@/components/ui/footer'

export default function PolitiqueConfidentialite() {
    return (
        <div className="min-h-screen bg-stone-50">
            <ModernNavigation />
            <div className="container mx-auto px-4 py-12 md:py-20 text-stone-800">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#e2943a]">Politique de Confidentialité</h1>

                <div className="space-y-8 max-w-4xl">
                    <section>
                        <p>
                            La présente Politique de Confidentialité décrit la manière dont <strong>Fuegos d&apos;azur SAS</strong> collecte, utilise et protège vos données personnelles lors de votre utilisation de notre site internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">1. Collecte des données</h2>
                        <p className="mb-2">Nous sommes susceptibles de collecter les données suivantes :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Données transmises directement :</strong> Nom, prénom, adresse email, numéro de téléphone, informations relatives à votre événement (lorsque vous remplissez notre formulaire de contact ou de devis).</li>
                            <li><strong>Données collectées automatiquement :</strong> Adresse IP, type de navigateur, pages visitées, durée de la visite (via des cookies Google Analytics, sous réserve de votre consentement).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">2. Utilisation des données</h2>
                        <p className="mb-2">Vos données sont utilisées pour :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Répondre à vos demandes de devis et de contact.</li>
                            <li>Exécuter les prestations de services traiteur commandées.</li>
                            <li>Améliorer notre site internet et nos services (statistiques anonymes via Google Analytics).</li>
                            <li>Vous proposer des publicités pertinentes (via Google Ads, sous réserve de votre consentement).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">3. Partage des données</h2>
                        <p>
                            Vos données personnelles sont strictement confidentielles et ne sont vendues à aucun tiers.
                            Elles peuvent être partagées avec nos prestataires techniques (hébergeur, outils d&apos;analyse) uniquement dans la limite nécessaire à l&apos;accomplissement des tâches qui leur sont confiées.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">4. Vos droits (RGPD)</h2>
                        <p className="mb-2">Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Droit d&apos;accès, de rectification et de suppression de vos données.</li>
                            <li>Droit à la limitation du traitement.</li>
                            <li>Droit d&apos;opposition au traitement.</li>
                            <li>Droit à la portabilité de vos données.</li>
                        </ul>
                        <p className="mt-4">
                            Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse suivante : <strong>contact@fuegosdazur.com</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">5. Cookies</h2>
                        <p>
                            Notre utilisation des cookies est détaillée dans notre <a href="/politique-cookies" className="text-[#e2943a] underline hover:text-orange-600">Politique de Cookies</a>.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
