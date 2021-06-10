import { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { RemoveScroll } from "react-remove-scroll";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { signCheck, signIn, signOut } from "../redux/reducers/init";
import { setMobile, setProgress } from "../redux/reducers/main";
import { setIsChat, getChatRooms } from "../redux/reducers/chat";

import { LoaderFS } from "./components/loader/LoaderFS";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Header } from "./components/header/Header";
import { Chat } from "./components/chat/Chat";

import { colors } from "../utils/colors";

const Container = styled.div`
  position: relative;
  min-width: 375px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  color: ${colors.fontBlack};

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

const ArtApp = ({
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
  setIsChat,
  getChatRooms,
}) => {
  // Chek mobile mode

  useEffect(() => {
    const watchResize = () => {
      window.innerWidth < 768 ? setMobile(true) : setMobile(false);
    };

    window.addEventListener("resize", watchResize);
  }, [setMobile]);

  // Check if signed in or not

  useEffect(() => signCheck(), [signCheck]);

  // If initialized , then get chat rooms

  useEffect(() => isInit && getChatRooms(), [isInit, getChatRooms, user]);

  // Handle progress bar

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 500);
  }, [progress, setProgress]);

  if (!isInit) return <LoaderFS />;

  return (
    <Container progress={progress}>
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
      />

      <RemoveScroll enabled={isChat}>
        <Chat />
      </RemoveScroll>

      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/profile/:id?" render={() => <ProfilePage />} />
      </Switch>
    </Container>
  );
};

const mstp = (state) => ({
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
  setIsChat,
  getChatRooms,
})(ArtApp);
