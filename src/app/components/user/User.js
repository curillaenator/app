import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

const UserStyled = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.primary};
  transition: 0.08s linear;
  cursor: pointer;

  & > p {
    font-size: 18px;
    font-weight: 800;
    margin-right: 8px;
  }

  & > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 6px solid ${colors.fontTitle};
    object-fit: cover;
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

export const User = ({ user, isMobile }) => {
  return (
    <UserStyled to="/profile">
      {!isMobile && <p>{user.username}</p>}
      <img src={user.avatar} alt={user.username} />
    </UserStyled>
  );
};
