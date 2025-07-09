import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, BookOpen, FileText, Brain, Zap} from "lucide-react"
export default function Features() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to learn, improve and create</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful AI tools designed to accelerate your language learning and unlock your creative potential
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                    <CardTitle>Language Roleplay</CardTitle>
                    <CardDescription>
                    Practice real conversations with AI in multiple languages and scenarios
                    </CardDescription>
                </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>AI Feedback</CardTitle>
                    <CardDescription>
                    Get instant grammar corrections and pronunciation tips tailored to your level
                    </CardDescription>
                </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>Vocab Tracking</CardTitle>
                    <CardDescription>
                    Automatically save and organize new words with smart spaced repetition
                    </CardDescription>
                </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Markdown/PDF Export</CardTitle>
                    <CardDescription>
                    Export your conversations and notes in clean, organized markdown format or PDF
                    </CardDescription>
                </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle>Brainstorming Assistant</CardTitle>
                    <CardDescription>
                    Break down complex ideas through guided AI conversations and structured thinking
                    </CardDescription>
                </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-pink-600" />
                    </div>
                    <CardTitle>Smart Sessions</CardTitle>
                    <CardDescription>
                    Adaptive learning that adjusts to your pace and preferred learning style
                    </CardDescription>
                </CardHeader>
                </Card>
            </div>
            </div>
        </section>
    )
}