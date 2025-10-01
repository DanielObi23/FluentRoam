"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div>
      Page does not exist, please go back
      <Button onClick={router.back}>Go back</Button>
    </div>
  );
}
