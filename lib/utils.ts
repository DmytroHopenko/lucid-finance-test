import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Implement calculation formula field

export const calculateValue = (formula: string) => {
    return formula ? "56" : (0).toString();
}