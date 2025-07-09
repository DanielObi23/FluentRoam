import { CheckCircle, Trophy } from "lucide-react"
export default function WhyDiscourse() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Why choose Discourse?</h2>
                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Fully Customizable Learning</h3>
                        <p className="text-gray-600">
                        Tailor your experience with custom scenarios, difficulty levels, and learning goals that adapt to
                        your progress.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Zero Manual Vocab Input</h3>
                        <p className="text-gray-600">
                        Our AI automatically identifies and saves new vocabulary from your conversations - no tedious
                        manual entry required.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Built-in Quiz Generation</h3>
                        <p className="text-gray-600">
                        Automatically generate personalized quizzes from your conversations to reinforce learning and
                        track progress.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Dual-Purpose Platform</h3>
                        <p className="text-gray-600">
                        Switch seamlessly between language learning and creative brainstorming - one platform for all your
                        conversational AI needs.
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                    <Trophy className="h-12 w-12 mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                    <p className="text-indigo-100 mb-6">
                    Join thousands of learners who are already talking smarter and learning faster with Discourse.
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>5+ Languages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>24/7 Available</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}