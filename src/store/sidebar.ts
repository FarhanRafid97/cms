import { create } from 'zustand';

interface ISidebarProps {
  widthSidebar: {
    ml: string;
    isOpen: boolean;
    isHover: boolean;
    isOpenMobile: boolean;
    w: string;
  };
  // eslint-disable-next-line no-unused-vars
  setSmallSidebar: () => void;
  setSmallSidebarMobile: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const useSidebarWidth = create<ISidebarProps>()((set) => ({
  widthSidebar: {
    ml: 'lg:ml-[260px]',
    w: 'lg:w-[260px]  w-[260px] lg:left-0 left-[-260px]',
    isHover: false,
    isOpen: true,
    isOpenMobile: false,
  },
  onMouseEnter: () =>
    set((state) => {
      if (state.widthSidebar.isOpen) {
        return state;
      }

      return {
        widthSidebar: {
          ml: 'lg:ml-[260px]',
          w: 'lg:w-[260px]',
          isOpen: state.widthSidebar.isOpen,
          isHover: true,
          isOpenMobile: false,
        },
      };
    }),
  onMouseLeave: () =>
    set((state) => {
      if (state.widthSidebar.isOpen) {
        return state;
      }

      return {
        widthSidebar: {
          ml: 'lg:ml-[60px]',
          w: 'lg:w-[60px]',
          isOpenMobile: false,
          isOpen: state.widthSidebar.isOpen,
          isHover: false,
        },
      };
    }),
  setSmallSidebar: () =>
    set((state) => {
      if (!state.widthSidebar.isOpen) {
        return {
          widthSidebar: {
            ml: 'lg:ml-[260px]',
            w: 'w-[260px]  left-0  lg:left-0 left-[-260px]',
            isOpen: true,
            isOpenMobile: false,
            isHover: false,
          },
        };
      }
      return {
        widthSidebar: {
          ml: 'lg:ml-[60px]',
          w: 'lg:w-[60px]  w-[260px] lg:left-0 left-[-260px]',
          isHover: false,
          isOpen: false,
          isOpenMobile: false,
        },
      };
    }),
  setSmallSidebarMobile: () =>
    set((state) => {
      if (!state.widthSidebar.isOpenMobile) {
        return {
          widthSidebar: {
            ml: 'lg:ml-[260px]',
            w: 'w-[260px]  left-0 ',
            isOpen: true,
            isOpenMobile: true,

            isHover: false,
          },
        };
      }
      return {
        widthSidebar: {
          ml: 'lg:ml-[260px]',
          w: ' lg:left-0 left-[-260px]  w-[260px]',
          isHover: false,
          isOpen: true,

          isOpenMobile: false,
        },
      };
    }),
}));
