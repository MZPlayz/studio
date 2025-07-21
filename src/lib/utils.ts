
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateBearing(start: {lat: number, lng: number}, end: {lat: number, lng: number}) {
  const lat1 = start.lat * Math.PI / 180;
  const lon1 = start.lng * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;
  const lon2 = end.lng * Math.PI / 180;

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}
