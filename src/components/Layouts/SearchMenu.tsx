import { Button } from '@/components/ui/button';
import { openSearchMenu } from '@/store/searchMenu';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const SearchMenu = () => {
  const [os, setOs] = useState('Unknown');

  useEffect(() => {
    const detectOS = () => {
      const platform = navigator.userAgent;

      if (platform.includes('Mac')) {
        return 'macOS';
      } else if (platform.includes('win')) {
        return 'Windows';
      } else {
        return 'Other';
      }
    };

    setOs(detectOS());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearchMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="rounded flex items-center justify-between p-2 gap-2 w-fit md:w-[220px] border-dashed text-xs text-muted-foreground h-8"
        onClick={() => openSearchMenu()}
      >
        <span className="flex gap-2 items-center">
          <MagnifyingGlassIcon width={16} height={16} />
          <span className="hidden md:block">Search Menu</span>
        </span>
        <span className="hidden md:block">{os === 'macOS' ? 'CMD' : 'CTRL'} + K</span>
      </Button>
    </div>
  );
};

export default SearchMenu;
