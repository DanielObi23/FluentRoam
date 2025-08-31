"use client";

import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import { toast } from "sonner";

export default function Page() {
  //simulate cards due
  if (Math.random() < 1) {
    toast("Cards Due For Review", {
      position: "top-center",
      style: {
        "--normal-bg":
          "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, oklch(var(--background)))",
        "--normal-text":
          "light-dark(oklch(var(--color-sky-600)), oklch(var(--color-sky-400)))",
        "--normal-border":
          "light-dark(oklch(var(--color-sky-600)), oklch(var(--color-sky-400)))",
      } as React.CSSProperties,
    });
  }
  return <ConversationForms />;
}
