import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
          Ready to transform how you learn and think?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-indigo-100">
          Join thousands of learners and creators who are already using
          PolySermo to unlock their potential through AI-powered conversations.
        </p>
        <Button
          size="lg"
          className="rounded-full bg-white px-12 py-4 text-lg font-semibold text-indigo-600 hover:bg-gray-100"
        >
          Start Your Journey Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="mt-4 text-sm text-indigo-200">
          No credit card required • Free tier available • Cancel anytime
        </p>
      </div>
    </section>
  );
}
