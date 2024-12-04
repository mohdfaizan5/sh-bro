import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to calculate the number of days remaining
export function daysRemaining(targetDate: string): number {
  const today: Date = new Date(); // Get today's date
  const target: Date = new Date(targetDate); // Target date: Dec 30, 2024

  // Calculate the difference in milliseconds
  const difference: number = target.getTime() - today.getTime();

  // Convert milliseconds to days
  const daysLeft: number = Math.floor(difference / (1000 * 60 * 60 * 24));

  return daysLeft;
}
