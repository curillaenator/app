import { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { signCheck, signIn, signOut } from "../redux/reducers/init";
import { setMobile, setProgress } from "../redux/reducers/main";

import { LoaderFS } from "./components/loader/LoaderFS";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Header } from "./components/header/Header";

import { colors } from "../utils/colors";

const Container = styled.div`
  position: relative:
  min-width: 375px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  color: ${colors.fontBlack};

  .progress {
    position: absolute;
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
  signCheck,
  signIn,
  signOut,
  setProgress,
  setMobile,
}) => {
  useEffect(() => {
    const watchResize = () => {
      window.innerWidth < 768 ? setMobile(true) : setMobile(false);
    };

    window.addEventListener("resize", watchResize);
  }, [setMobile]);

  useEffect(() => signCheck(), [signCheck]);

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 1000);
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
        signIn={signIn}
        signOut={signOut}
        isMobile={isMobile}
      />

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
});

export const App = connect(mstp, {
  setMobile,
  setProgress,
  signCheck,
  signIn,
  signOut,
})(ArtApp);
