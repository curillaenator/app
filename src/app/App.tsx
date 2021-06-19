import { FC, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { RemoveScroll } from "react-remove-scroll";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { signCheck, signIn, signOut } from "../redux/reducers/init";
import { setIsChat, getChatRooms } from "../redux/reducers/chat";
import { setMobile, setProgress, setProfileList } from "../redux/reducers/main";

import { LoaderFS } from "./components/loader/LoaderFS";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { StarredPage } from "./pages/StarredPage";
import { Header } from "./components/header/Header";
import { Chat } from "./components/chat/Chat";

import { colors } from "../utils/colors";

import { TypeState } from "../redux/store";

interface IContainer {
  progress: boolean;
}

const Container = styled.div<IContainer>`
  position: relative;
  min-width: 375px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  color: ${colors.primary};

  .progress {
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    opacity: ${({ progress }) => (progress ? 1 : 0)};
    transition: 0.08s linear;
  }

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  @media (min-width: 1024px) {
    padding: 0 56px;
`;

interface IApp {
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
  setIsChat: () => void;
  getChatRooms: () => void;
}

const ArtApp: FC<IApp> = ({
  isInit,
  user,
  progress,
  isMobile,
  isChat,
  chatRooms,
  signCheck,
  signIn,
  signOut,
  setProgress,
  setMobile,
  setProfileList,
  setIsChat,
  getChatRooms,
}) => {
  // Chek mobile mode

  const watchResize = useCallback(() => {
    window.innerWidth < 1024 ? setMobile(true) : setMobile(false);
  }, [setMobile]);

  useEffect(() => {
    watchResize();
    window.addEventListener("resize", watchResize);

    return () => window.removeEventListener("resize", watchResize);
  }, [watchResize]);

  // Check if signed in or not

  useEffect(() => signCheck(), [signCheck]);

  // If initialized , then get chat rooms

  useEffect(() => user && user.userID && getChatRooms(), [getChatRooms, user]);

  // Handle progress bar

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 500);
  }, [progress, setProgress]);

  if (!isInit) return <LoaderFS />;

  return (
    <Container progress={!!progress}>
      <div className="progress">
        <ProgressBar
          completed={progress || 0}
          bgColor={colors.primary}
          isLabelVisible={false}
          baseBgColor="transparent"
          height="2px"
          transitionDuration="0.4s"
        />
      </div>

      <Header
        user={user}
        isMobile={isMobile}
        signIn={signIn}
        signOut={signOut}
        setIsChat={setIsChat}
        chatRooms={chatRooms}
        setProfileList={setProfileList}
      />

      <RemoveScroll enabled={isChat}>
        <Chat />
      </RemoveScroll>

      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/starred" render={() => <StarredPage />} />
        <Route path="/profile/:id?" render={() => <ProfilePage />} />
      </Switch>
    </Container>
  );
};

const mstp = (state: TypeState) => ({
  isInit: state.init.isInit,
  user: state.init.user,
  progress: state.main.progress,
  isMobile: state.main.isMobile,
  isChat: state.chat.isChat,
  chatRooms: state.chat.chatRooms,
});

export const App = connect(mstp, {
  setMobile,
  setProgress,
  signCheck,
  signIn,
  signOut,
  setProfileList,
  setIsChat,
  getChatRooms,
})(ArtApp);