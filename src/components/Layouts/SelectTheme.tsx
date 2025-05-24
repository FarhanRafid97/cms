'use client';

import * as React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { CircleDashed } from 'lucide-react';
interface SelectedTheme {
  Icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  html?: React.ReactNode;

  label: string;
  value: string;
}

const theme_select: SelectedTheme[] = [
  {
    Icon: SunIcon,
    label: 'Light',
    value: 'light',
  },
  {
    Icon: MoonIcon,
    label: 'Dark',
    value: 'dark',
  },

  {
    html: <CircleDashed className="text-emerald-500" size={16} />,
    label: 'Matcha',
    value: 'matcha',
  },
  {
    html: <CircleDashed className="text-orange-500" size={16} />,
    label: 'Lemonade',
    value: 'lemonade',
  },
  {
    html: <CircleDashed className="text-sky-500" size={16} />,
    label: 'Cupcake',
    value: 'cupcake',
  },
];

const SelectTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const showSelectedTheme = React.useMemo(() => {
    const selected = theme_select.find((item) => item.value === theme);
    if (selected) {
      return selected;
    }
    return theme_select[0];
  }, [theme]);

  if (!isClient) {
    return <Skeleton className="h-6 w-6" />;
  }

  return isClient ? (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          {' '}
          {showSelectedTheme.Icon ? (
            <showSelectedTheme.Icon width={16} height={16} />
          ) : (
            showSelectedTheme.html
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999] w-[220px] mr-2">
          {' '}
          {theme_select.map((selectedTheme) => (
            <DropdownMenuItem
              key={selectedTheme.value}
              onClick={() => {
                setTheme(selectedTheme.value);
              }}
              className={cn('space-x-1', theme === selectedTheme.value ? 'bg-accent' : '')}
            >
              <div className={cn('flex items-center gap-2')}>
                {selectedTheme.Icon ? (
                  <selectedTheme.Icon width={16} height={16} />
                ) : (
                  selectedTheme.html
                )}

                <label htmlFor="">{selectedTheme.label}</label>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <Skeleton className="h-6 w-6" />
  );
};

export default SelectTheme;
