import { Sparkles, BookOpen, FileText} from "lucide-react"
export default function HowItWorks() {
    return (
        <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">See how a session works</h2>
                <p className="text-xl text-gray-600">Experience the power of AI-driven conversations</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                {/* User Side */}
                <div className="p-8 border-r border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">You</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Your Input</h3>
                    </div>
                    <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                        <p className="text-gray-800">{"Je voudrais commander un café, s'il vous plaît"}</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4">
                        <p className="text-gray-800">{"How can I brainstorm ideas for my startup?"}</p>
                    </div>
                    </div>
                </div>

                {/* AI Side */}
                <div className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">AI Response</h3>
                    </div>
                    <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-800">{"Bien sûr! Quel type de café préférez-vous?"}</p>
                        <div className="mt-2 text-sm text-green-600">✓ Perfect use of formal register</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-800">
                        {"Let's start with your target market. Who are you trying to help?"}
                        </p>
                        <div className="mt-2 text-sm text-blue-600">→ Guiding you through structured thinking</div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Bottom Section - Feedback & Export */}
                <div className="border-t border-gray-200 p-8 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        Markdown Feedback
                    </h4>
                    <div className="bg-white rounded-lg p-4 font-mono text-sm">
                        <div className="text-gray-600">## Grammar Notes</div>
                        <div className="text-gray-800">- Excellent formal register usage</div>
                        <div className="text-gray-800">- Consider: "Un café" vs "Du café"</div>
                    </div>
                    </div>
                    <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                        Vocab Extraction
                    </h4>
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">commander</span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            s'il vous plaît
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">préférer</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}