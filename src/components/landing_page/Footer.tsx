import { MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 py-12">
      <p className="text-center text-gray-400">
        &copy; {currentYear} PolySermo. All rights reserved.
      </p>
    </footer>
  );
}
