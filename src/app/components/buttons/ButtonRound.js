import styled from "styled-components";

import { colors } from "../../../utils/colors";

const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: ${colors.primary};
  cursor: pointer;
  transition: 0.08s linear;
  will-change: transform;

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${colors.fontLightGray};
  }

  &:hover {
    // background-color: ${colors.primaryHover};
    transform: scale(1.04);
    filter: drop-shadow(0 8px 8px ${colors.shadow});
  }

  &:active {
    // background-color: ${colors.primary};
    transform: scale(1);
    filter: none;
  }
`;

export const ButtonRound = ({ icon, handler }) => {
  return <ButtonStyled onClick={handler}>{icon}</ButtonStyled>;
};
