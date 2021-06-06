import styled from "styled-components";

import { colors } from "../../../utils/colors";

const WelcomeStyled = styled.h1`
  margin: 24px 0;
  font-size: 38px;
  font-weight: 900;
  line-height: 1;
  color: ${colors.fontTitle};

  @media (min-width: 768px) {
    margin: 32px 0;
    font-size: 52px;
  }

  @media (min-width: 1024px) {
    margin: 56px 0;
    font-size: 72px;
  }
`;

export const Welcome = ({ title }) => {
  return <WelcomeStyled>{title}</WelcomeStyled>;
};
