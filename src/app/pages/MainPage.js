import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { setProfile } from "../../redux/reducers/main";

const MainPageStyled = styled.div``;

const Main = ({ setProfile }) => {
  useEffect(() => setProfile(null), [setProfile]);

  return <MainPageStyled></MainPageStyled>;
};

const mstp = (state) => ({});

export const MainPage = connect(mstp, { setProfile })(Main);
