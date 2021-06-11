import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  setProfile,
  getStarredList,
  handleStarred,
} from "../../redux/reducers/main";

import { Welcome } from "../components/welcome/Welcome";
import { LoaderLocal } from "../components/loader/LoaderLocal";
import { UserList } from "../components/userlist/UserList";

// import { icons } from "../../utils/icons";
import { words } from "../../utils/worder";

const StarredPageStyled = styled.div``;

export const Starred = ({
  isMobile,
  user,
  loadStarredList,
  starredList,
  setProfile,
  getStarredList,
  handleStarred,
}) => {
  useEffect(() => setProfile(null), [setProfile]);
  useEffect(() => getStarredList(), [getStarredList]);

  return (
    <StarredPageStyled>
      <Welcome title={words.starredTitle} />

      {loadStarredList && <LoaderLocal />}

      {!loadStarredList && (
        <UserList
          profileList={starredList}
          isMobile={isMobile}
          userID={user && user.userID}
          starred={user && user.userID ? user.starred : {}}
          handleStarred={handleStarred}
        />
      )}
    </StarredPageStyled>
  );
};

const mstp = (state) => ({
  isMobile: state.main.isMobile,
  user: state.init.user,
  loadStarredList: state.main.loadStarredList,
  starredList: state.main.starredList,
});

export const StarredPage = connect(mstp, {
  setProfile,
  getStarredList,
  handleStarred,
})(Starred);
