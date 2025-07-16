"use client";

import { useAppTheme } from "@/hooks/use-app-theme";
import { colorThemes } from "@/lib/colorThemes";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, dark } = useAppTheme();

  useEffect(() => {
    const root = document.documentElement;
    const palette = colorThemes[theme].colors[dark ? "dark" : "light"];

    // primary, secondary, accent scales
    Object.entries(palette.primary).forEach(([k, v]) =>
      root.style.setProperty(`--primary-${k}`, v)
    );
    Object.entries(palette.secondary).forEach(([k, v]) =>
      root.style.setProperty(`--secondary-${k}`, v)
    );
    Object.entries(palette.accent).forEach(([k, v]) =>
      root.style.setProperty(`--accent-${k}`, v)
    );

    // semantic
    root.style.setProperty("--background", palette.background);
    root.style.setProperty("--foreground", palette.foreground);
    root.style.setProperty("--muted", palette.muted);
    root.style.setProperty("--muted-foreground", palette.mutedForeground);
    root.style.setProperty("--border", palette.border);
  }, [theme, dark]);

  return <>{children}</>;
}