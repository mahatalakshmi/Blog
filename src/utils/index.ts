import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(page: string): string {
  const routes: Record<string, string> = {
    'Home': '/',
    'AllPosts': '/posts',
    'BlogPost': '/post',
    'CreatePost': '/create',
  }
  return routes[page] || '/'
}

