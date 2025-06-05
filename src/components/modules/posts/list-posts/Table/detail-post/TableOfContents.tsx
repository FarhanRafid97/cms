import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Header {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, className }) => {
  const [headers, setHeaders] = useState<Header[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Create a temporary div to parse the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Extract all headers (h1, h2, h3)
    const headerElements = tempDiv.querySelectorAll('h1, h2, h3');
    const extractedHeaders: Header[] = Array.from(headerElements).map((element) => {
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      element.id = id; // Set the id if it doesn't exist
      return {
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      };
    });

    setHeaders(extractedHeaders);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' },
    );

    headers.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (headers.length === 0) return null;

  return (
    <nav className={cn('w-64 p-4 space-y-2', className)}>
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headers.map((header) => (
          <li
            key={header.id}
            className={cn(
              'cursor-pointer hover:text-primary transition-colors',
              'text-sm',
              header.level === 1 && 'font-semibold',
              header.level === 2 && 'ml-4',
              header.level === 3 && 'ml-8',
              activeId === header.id && 'text-primary font-medium',
            )}
            onClick={() => scrollToHeader(header.id)}
          >
            {header.text}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
