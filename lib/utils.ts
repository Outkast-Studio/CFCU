import { type ClassValue,clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '')

  // Return the formatted number with tel: prefix
  return `tel:${digitsOnly}`
}

export function getGoogleMapsLink(coordinates: {
  longitude: number
  latitude: number
}): string {
  // const encodedAddress = encodeURIComponent(address)
  return `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
  // return `https://www.google.com/maps/search/businesses/@${coordinates.latitude},${coordinates.longitude}`
}
