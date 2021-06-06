import { Link } from "react-router-dom";
import styled from "styled-components";

import { User } from "../user/User";
import { ButtonOutline } from "../buttons/ButtonOutline";

// import { icons } from "../../../utils/icons";
import { colors } from "../../../utils/colors";

import logo from "../../../assets/images/logo.png";

const LogoStyled = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
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

  @media (min-width: 768px) {
    margin-top: 24px;
  }

  @media (min-width: 1024px) {
    margin-top: 44px;
  }
`;

export const Header = ({ user, signIn, isMobile }) => {
  return (
    <HeaderStyled>
      <LogoStyled to="/">
        <img className="image" src={logo} alt="Logo" />
        {!isMobile && <div className="text">A R T</div>}
      </LogoStyled>

      {!user.userID && (
        <div className="buttons">
          <ButtonOutline title="Вход" handler={signIn} />
        </div>
      )}

      {user.userID && <User user={user} isMobile={isMobile} />}
    </HeaderStyled>
  );
};
