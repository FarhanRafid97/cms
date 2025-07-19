import { create } from 'zustand';

interface RightSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void;
}

export const useRightSidebarStore = create<RightSidebarProps>()((set) => ({
  isOpen: true,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
