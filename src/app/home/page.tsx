"use client";

import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    //simulate cards due
    toast("Cards Due For Review", {
      position: "top-center",
      style: {
        "--normal-bg": "light-dark(var(--color-sky-600), var(--color-sky-400))",
        "--normal-text": "var(--color-white)",
        "--normal-border":
          "light-dark(var(--color-sky-600), var(--color-sky-400))",
        // "--normal-bg":
        //   "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, oklch(var(--background)))",
        // "--normal-text":
        //   "light-dark(oklch(var(--color-sky-600)), oklch(var(--color-sky-400)))",
        // "--normal-border":
        //   "light-dark(oklch(var(--color-sky-600)), oklch(var(--color-sky-400)))",
      } as React.CSSProperties,
    });
  }, []);
  return <ConversationForms />;
}
