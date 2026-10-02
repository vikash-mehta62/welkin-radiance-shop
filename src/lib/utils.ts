import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSequenceRank(sequence?: number): number {
  const seq = typeof sequence === "number" && !isNaN(sequence) ? sequence : 0;
  if (seq > 0) return seq;
  if (seq < 0) return 2000000 + seq; // e.g. -1 becomes 1999999 (last), -2 becomes 1999998 (2nd last)
  return 1000000; // 0 or unset in the middle
}

export function sortProductsBySequence<T extends { sequence?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const rankA = getSequenceRank(a.sequence);
    const rankB = getSequenceRank(b.sequence);
    return rankA - rankB;
  });
}
