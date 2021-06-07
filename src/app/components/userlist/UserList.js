import styled from "styled-components";

import { UserCard } from "./UserCard";

const ListStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const UserList = ({ profileList }) => {
  return (
    <ListStyled>
      {profileList.map((profile) => (
        <UserCard profile={profile} key={profile.profileID} />
      ))}
    </ListStyled>
  );
};
