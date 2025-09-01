"use client";
import { useSearchParams } from "next/navigation";

// TO BE USED WITH THE SEARCH BAR COMPONENT
export default function useSearchBar() {
  const searchParams = useSearchParams();
  const search = (searchParams.get("search") as string) || "";
  const pageString = searchParams.get("page") as string;
  const page =
    Number(pageString) > 0 && Number.isInteger(Number(pageString)) //Making sure it's neither float nor negative
      ? Number(pageString)
      : 1;
  const pageLimit = 10;

  return { search, page, pageLimit };
}
