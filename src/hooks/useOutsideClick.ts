import React, { useEffect } from 'react';

interface ValidRefTarget {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  contains(target: EventTarget | null): any;
}

interface IOutsideClickProps {
  ref: React.RefObject<ValidRefTarget>;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (toggle: boolean) => void | React.Dispatch<React.SetStateAction<boolean>>;
}

export function useOutsideClick({ isOpen, ref, setIsOpen }: IOutsideClickProps) {
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, isOpen, setIsOpen]);
}
