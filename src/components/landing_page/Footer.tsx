import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <>
            {/* CTAS */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to transform how you learn and think?
                </h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of learners and creators who are already using Discourse to unlock their potential through
                    AI-powered conversations.
                </p>
                <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-12 py-4 rounded-full font-semibold"
                >
                    Start Your Journey Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-indigo-200 mt-4 text-sm">No credit card required • Free tier available • Cancel anytime</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <MessageCircle className="h-6 w-6 text-indigo-400" />
                        <span className="text-xl font-bold">Discourse</span>
                    </div>
                    <p className="text-gray-400">AI-powered conversations for language learning and creative thinking.</p>
                    </div>
                    <div>
                    <h3 className="font-semibold mb-4">Product</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                        <a href="#" className="hover:text-white">
                            Features
                        </a>
                        </li>
                        <li>
                        <a href="#" className="hover:text-white">
                            Pricing
                        </a>
                        </li>
                        <li>
                        <a href="#" className="hover:text-white">
                            Languages
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                        <a href="#" className="hover:text-white">
                            Help Center
                        </a>
                        </li>
                        <li>
                        <a href="#" className="hover:text-white">
                            Contact Us
                        </a>
                        </li>
                        <li>
                        <a href="#" className="hover:text-white">
                            Community
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                        <a href="#" className="hover:text-white">
                            About
                        </a>
                        </li>
                        <li>
                        <a href="#" className="hover:text-white">
                            Blog
                        </a>
                        </li>
                        <li>
                        <a href="#" className="hover:text-white">
                            Privacy
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} Discourse. All rights reserved.</p>
                </div>
                </div>
            </footer>
        </>
    )
}