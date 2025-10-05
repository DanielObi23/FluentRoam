import { CheckCircle, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    header: "Fully Customizable Learning",
    text: "Tailor your experience with custom scenarios, difficulty levels, and feedback.",
  },
  {
    header: "Zero Manual Vocab Input",
    text: "Our AI automatically identifies and saves new vocabulary from your conversations — no tedious manual entry required.",
  },
  {
    header: "Automatic feedback",
    text: "Automatically generate personalized feedback from your conversations to improve.",
  },
  {
    header: "Vocabulary library",
    text: "Add vocabs from conversations and stories into vocab library from a click of the button.",
  },
];

export default function WhyPolySermo() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Card className="border-0 p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="mb-6 text-4xl font-bold text-gray-900">
                Why choose FluentRoam?
              </CardTitle>
              <CardDescription className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-gray-900">
                        {feature.header}
                      </h3>
                      <p className="text-gray-600">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
              <Trophy className="mb-6 h-12 w-12" />
              <h3 className="mb-4 text-2xl font-bold">Ready to get started?</h3>
              <p className="mb-6 text-indigo-100">
                Join thousands of learners who are already learning faster with
                FluentRoam.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span>5+ Languages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
