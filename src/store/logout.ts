import { create } from 'zustand';

interface LogoutProps {
  isLogout: boolean;
}

export const useLogoutUser = create<LogoutProps>(() => ({
  isLogout: false,
}));

export const logoutHandler = () => {
  return useLogoutUser.setState({ isLogout: true });
};
