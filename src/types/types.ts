// App.tsx

export interface IContainer {
    progress: boolean;
  }

export interface IApp {
    isInit: boolean;
    user: any;
    progress: number | null;
    isMobile: boolean;
    isChat: boolean;
    chatRooms: any;
    signCheck: () => void;
    signIn: () => void;
    signOut: () => void;
    setProgress: (payload: number | null) => void;
    setMobile: (payload: boolean) => void;
    setProfileList: () => void;
    setIsChat: (payload: boolean) => void;
    getChatRooms: () => void;
  }


// Header.tsx

export interface IStyledPopup {
  note: boolean;
}

export interface IUserStyled {
  open: boolean;
}

export interface IHeader {
  isMobile: boolean;
  user: any;
  chatRooms: any;
  signIn: () => void;
  signOut: () => void;
  setProfileList: (array: any) => void;
  setIsChat: (payload: boolean) => void;
}