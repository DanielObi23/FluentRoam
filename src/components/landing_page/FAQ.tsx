import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need an account to get started?",
    answer:
      "Yes, You can try FluentRoam with a free starter session — no payment required.",
  },
  {
    question: "Which languages are currently supported?",
    answer:
      "FluentRoam currently only supports Spanish. French, Italian, German, and Russian — will be added later as the app grows.",
  },
  {
    question: "Will my conversations and vocabulary be saved?",
    answer:
      "Yes. FluentRoam automatically saves key vocabulary and example sentences from your sessions. You can review or export them anytime.",
  },
  {
    question: "Is FluentRoam free to use?",
    answer:
      "Yes — the free tier gives you access to basic features. Premium plans will include unlimited practice, deeper feedback, and advanced AI tools once launched.",
  },
  {
    question: "Do I need an internet connection?",
    answer:
      "An active connection is required for AI-powered conversations, but you can always review saved vocabulary without one.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-900">
            Everything you need to know about{" "}
            <span className="font-semibold text-red-800">FluentRoam</span>
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-lg border-0 bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
