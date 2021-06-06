import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

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

export const App = () => {
  return (
    <Container>
      <Header />

      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
      </Switch>
    </Container>
  );
};

export default App;
