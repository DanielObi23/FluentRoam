import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, CheckCircle, BookOpen, FileText } from "lucide-react";

const features = [
  {
    title: "Language Roleplay",
    description:
      "Practice real conversations with AI in multiple languages and scenarios",
    icon: Users,
    color: "indigo",
  },
  {
    title: "AI Feedback",
    description:
      "Get instant grammar corrections and pronunciation tips tailored to your level",
    icon: CheckCircle,
    color: "green",
  },
  {
    title: "Vocab Tracking",
    description:
      "Automatically save new words and phrases from stories and conversations",
    icon: BookOpen,
    color: "purple",
  },
  {
    title: "AI Story Generation",
    description:
      "Generate creative stories in your target language to expand your vocabulary and comprehension",
    icon: FileText,
    color: "blue",
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Everything you need to learn AND improve
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-800">
            Powerful AI tools designed to accelerate your language learning
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <CardHeader>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${feature.color}-100`}
                >
                  <feature.icon
                    className={`h-6 w-6 text-${feature.color}-600`}
                  />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
