import styled from "styled-components";

import { Button as ButtonOutline } from "../buttons/ButtonOuline";

// import { icons } from "../../../utils/icons";
import { colors } from "../../../utils/colors";

import logo from "../../../assets/images/logo.png";

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  transition: 0.08s linear;
  cursor: pointer;

  .image {
    width: 56px;
    height: 56px;
    margin-right: 16px;
    object-fit: cover;
  }

  .text {
    font-weight: 900;
    font-size: 32px;
    color: ${colors.primary};
  }

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 6px 4px ${colors.shadow});
  }

  &:active {
    transform: scale(1);
    filter: none;
  }
`;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
`;

export const Header = ({ isAuth, signIn }) => {
  return (
    <HeaderStyled>
      <LogoStyled>
        <img className="image" src={logo} alt="Logo" />
        <div className="text">A R T</div>
      </LogoStyled>

      {!isAuth && (
        <div className="buttons">
          <ButtonOutline title="Вход" handler={signIn} />
        </div>
      )}
    </HeaderStyled>
  );
};
