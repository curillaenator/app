import { connect } from "react-redux";
import styled from "styled-components";

const MainPageStyled = styled.div``;

const Main = () => {
  return <MainPageStyled></MainPageStyled>;
};

const mstp = (state) => {};

export const MainPage = connect(mstp, {})(Main);
