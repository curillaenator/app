import { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { signCheck, signIn } from "../redux/reducers/init";

import { MainPage } from "./pages/MainPage";
import { Header } from "./components/header/Header";

import { colors } from "../utils/colors";

const Container = styled.div`
  min-width: 320px;
  padding: 0 24px;
  background-color: ${colors.bgLightGray};
  color: ${colors.fontBlack};

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  @media (min-width: 1024px) {
    padding: 0 56px;
`;

const ArtApp = ({ isInit, isAuth, signCheck, signIn }) => {
  useEffect(() => signCheck(), [signCheck]);

  if (!isInit) return <div>Загрузка</div>;

  return (
    <Container>
      <Header isAuth={isAuth} signIn={signIn} />

      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
      </Switch>
    </Container>
  );
};

const mstp = (state) => ({
  isInit: state.init.isInit,
  isAuth: state.init.isAuth,
});

export const App = connect(mstp, { signCheck, signIn })(ArtApp);
