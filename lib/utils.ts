// app/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes netjes en voorkom conflicten. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Kleine helpers (optioneel, maar handig in je UI) */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function formatDate(d: Date | string, locale = "nl-NL") {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}