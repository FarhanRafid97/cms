import { create } from 'zustand';

interface LogoutProps {
  isOpen: boolean;
}

export const useOpenSearchMenu = create<LogoutProps>(() => ({
  isOpen: false,
}));

export const openSearchMenu = () => {
  return useOpenSearchMenu.setState({ isOpen: true });
};
export const setSearchMenuTogle = (toggle: boolean) => {
  return useOpenSearchMenu.setState({ isOpen: toggle });
};
