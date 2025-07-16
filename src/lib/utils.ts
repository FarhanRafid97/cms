import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { Archive, CircleDashed, CircleDotDashed, LucideIcon, Rss } from 'lucide-react';
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

export const formatedDateDDMMYYY = (date?: string, isWithTime = true) => {
  const formatString = isWithTime ? 'dd MMMM yyyy - HH:mm:ss' : 'dd MMMM yyyy';

  if (!date) {
    return format(new Date(), formatString);
  }

  const parsedDate = date.endsWith('Z') ? date.slice(0, -1) : date;
  return format(parsedDate, formatString);
};

export const getStatusConfig = (status: string) => {
  const normalizedStatus = status?.toLowerCase();

  switch (normalizedStatus) {
    case 'draft':
      return {
        label: 'Draft',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        dotColor: 'bg-amber-400',
        icon: '✏️',
      };
    case 'published':
      return {
        label: 'Published',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        dotColor: 'bg-emerald-400',
        icon: '✓',
      };
    case 'archived':
      return {
        label: 'Archived',
        bgColor: 'bg-slate-50',
        textColor: 'text-slate-600',
        borderColor: 'border-slate-200',
        dotColor: 'bg-slate-400',
        icon: '📦',
      };
    default:
      return {
        label: 'Unknown',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-600',
        borderColor: 'border-gray-200',
        dotColor: 'bg-gray-400',
        icon: '?',
      };
  }
};

export const getStatusIcon = (status: string): LucideIcon => {
  const normalizedStatus = status?.toLowerCase();

  switch (normalizedStatus) {
    case 'draft':
      return CircleDashed;
    case 'published':
      return Rss;
    case 'archived':
      return Archive;
    default:
      return CircleDotDashed;
  }
};

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''))
    .join(' ');
}
