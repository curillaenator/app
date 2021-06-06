import { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { signCheck, signIn } from "../redux/reducers/init";
import { setMobile } from "../redux/reducers/main";

import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Header } from "./components/header/Header";

import { colors } from "../utils/colors";

const Container = styled.div`
  min-width: 320px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  color: ${colors.fontBlack};

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  @media (min-width: 1024px) {
    padding: 0 56px;
`;

const ArtApp = ({
  isInit,
  isAuth,
  user,
  isMobile,
  signCheck,
  signIn,
  setMobile,
}) => {
  useEffect(() => {
    const watchResize = () => {
      window.innerWidth < 768 ? setMobile(true) : setMobile(false);
    };

    window.addEventListener("resize", watchResize);
  }, [setMobile]);

  useEffect(() => signCheck(), [signCheck]);

  if (!isInit) return <div>Загрузка</div>;

  return (
    <Container>
      <Header isAuth={isAuth} user={user} signIn={signIn} isMobile={isMobile} />

      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/profile/:id?" render={() => <ProfilePage />} />
      </Switch>
    </Container>
  );
};

const mstp = (state) => ({
  isInit: state.init.isInit,
  isAuth: state.init.isAuth,
  user: state.init.user,
  isMobile: state.main.isMobile,
});

export const App = connect(mstp, { setMobile, signCheck, signIn })(ArtApp);
