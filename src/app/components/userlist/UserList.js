import styled from "styled-components";

import { UserCard } from "./UserCard";

const ListStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const UserList = ({
  isMobile,
  userID,
  profileList,
  starred,
  handleStarred,
}) => {
  return (
    <ListStyled>
      {profileList.map((profile) => (
        <UserCard
          userID={userID}
          profile={profile}
          starred={starred}
          key={profile.profileID}
          isMobile={isMobile}
          handleStarred={handleStarred}
        />
      ))}
    </ListStyled>
  );
};
