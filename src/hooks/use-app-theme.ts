"use client";

import { useEffect, useState } from "react";
import type { ThemeName } from "@/lib/colorThemes";

const STORAGE_KEY = "polysermo-theme";

export function useAppTheme() {
  const [theme, setTheme] = useState<ThemeName>("aurora");
  const [dark, setDark] = useState(false);

  // 1️⃣  hydrate from localStorage / system
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { t, d } = JSON.parse(saved);
      setTheme(t);
      setDark(d);
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // 2️⃣  sync <html class="dark"> + localStorage
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ t: theme, d: dark }));
  }, [theme, dark]);

  return { theme, setTheme, dark, setDark };
}