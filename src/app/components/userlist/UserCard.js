import { Link } from "react-router-dom";
import styled from "styled-components";

const CardStyled = styled(Link)``;

export const UserCard = ({ user }) => {
  return (
    <CardStyled to={`/profile/${user.userID}`}>{user.username}</CardStyled>
  );
};
