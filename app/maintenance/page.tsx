import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-stone-100">

                {/* Header / Logo Area */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#e2943a]">
                        Site en maintenance
                    </h1>
                    <div className="w-24 h-1 bg-[#e2943a] mx-auto rounded-full opacity-50"></div>
                </div>

                {/* Main Content */}
                <div className="space-y-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                    <p>
                        Notre site est actuellement en cours de mise à jour pour vous offrir une expérience encore plus savoureuse 🔥
                    </p>

                    <p className="font-medium text-gray-800">
                        ⏳ Merci de votre patience. Nous revenons très bientôt !
                    </p>

                    <p className="text-base sm:text-lg">
                        Pour toute demande, n&apos;hésitez pas à nous contacter par e-mail.
                    </p>
                </div>

                {/* Contact Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">


                    <Link href="mailto:contact@fuegosdazur.com">
                        <Button className="gap-2 bg-[#e2943a] hover:bg-[#d08530] text-white">
                            <Mail className="w-5 h-5" />
                            Nous contacter
                        </Button>
                    </Link>
                </div>

                {/* Footer */}
                <div className="pt-8 text-sm text-gray-500">
                    <p>À très vite,</p>
                    <p className="font-semibold text-[#e2943a]">L&apos;équipe Fuegos d&apos;Azur</p>
                </div>
            </div>
        </div>
    )
}
