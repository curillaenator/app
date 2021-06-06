import styled from "styled-components";

import { UserCard } from "./UserCard";

const ListStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const UserList = ({ userList }) => {
  return (
    <ListStyled>
      {userList.map((user) => (
        <UserCard user={user} key={user.userID} />
      ))}
    </ListStyled>
  );
};
