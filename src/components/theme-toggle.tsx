"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themes = ["light", "dark", "system"] as const;
const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const currentTheme =
    mounted && themes.includes(theme as (typeof themes)[number])
      ? (theme as (typeof themes)[number])
      : "light";

  const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
  const Icon =
    currentTheme === "dark" ? Moon : currentTheme === "light" ? Sun : Laptop;

  return (
    <button
      aria-label="切换主题"
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      title={`当前：${currentTheme}，点击切换到 ${nextTheme}`}
      type="button"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
