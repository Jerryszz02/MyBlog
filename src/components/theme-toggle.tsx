"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["system", "light", "dark"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const currentTheme = themes.includes(theme as (typeof themes)[number])
    ? (theme as (typeof themes)[number])
    : "system";

  const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
  const Icon =
    currentTheme === "dark" ? Moon : currentTheme === "light" ? Sun : Laptop;

  return (
    <button
      aria-label="切换主题"
      className="inline-flex size-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
      onClick={() => setTheme(nextTheme)}
      title={`当前：${currentTheme}，点击切换到 ${nextTheme}`}
      type="button"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
