"use client";

import { useAppTheme } from "@/hooks/use-app-theme";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { colorThemes } from "@/lib/colorThemes";

export function ThemeToggle() {
  const { theme, setTheme, dark, setDark } = useAppTheme();

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>

      <Select
        value={theme}
        onValueChange={(value) => setTheme(value as keyof typeof colorThemes)}
      >
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(colorThemes).map((t) => (
            <SelectItem key={t} value={t}>
              {colorThemes[t as keyof typeof colorThemes].name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}