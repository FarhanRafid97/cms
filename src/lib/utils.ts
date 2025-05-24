import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const formatedDateDDMMYYY = (date: string, isWithTime = true) => {
  const formatString = isWithTime ? 'dd MMMM yyyy - HH:mm:ss' : 'dd MMMM yyyy';

  if (!date) {
    return format(new Date(), formatString);
  }

  const parsedDate = date.endsWith('Z') ? date.slice(0, -1) : date;
  return format(parsedDate, formatString);
};
