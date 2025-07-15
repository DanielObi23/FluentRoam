import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">Everything you need to know about PolySermo</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="account" className="bg-white rounded-lg border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    Do I need an account to get started?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                    You can try PolySermo with a limited free session, but creating an account unlocks full features
                    including conversation history, vocabulary tracking, and personalized learning paths.
                </AccordionContent>
                </AccordionItem>

                <AccordionItem value="export" className="bg-white rounded-lg border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    Can I export my conversation data?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                    You can export all your conversations, vocabulary lists, and learning progress in markdown format, PDF or
                    CSV. Your data belongs to you.
                </AccordionContent>
                </AccordionItem>

                <AccordionItem value="languages" className="bg-white rounded-lg border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    Which languages are supported?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                    We support 5 languages including Spanish, French, German, Italian, Portuguese. New languages are added regularly based on user demand.
                </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pricing" className="bg-white rounded-lg border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold">How does pricing work?</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                    We offer a free tier with basic features and limited conversations. Premium plans start at $9/month for
                    unlimited conversations, advanced AI feedback, and priority support.
                </AccordionContent>
                </AccordionItem>

                <AccordionItem value="offline" className="bg-white rounded-lg border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    Can I use PolySermo offline?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                    PolySermo requires an internet connection for AI conversations, but you can review your saved vocabulary
                    and exported conversations offline anytime.
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        </section>
    )
}