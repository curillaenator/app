import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { setProfile, getUserList } from "../../redux/reducers/main";

import { Welcome } from "../components/welcome/Welcome";
import { UserList } from "../components/userlist/UserList";

// import { colors } from "../../utils/colors";
import { words } from "../../utils/worder";

const MainPageStyled = styled.div``;

const Main = ({ userList, setProfile, getUserList }) => {
  useEffect(() => getUserList(), [getUserList]);
  useEffect(() => setProfile(null), [setProfile]);

  return (
    <MainPageStyled>
      <Welcome title={words.mainTitle} />

      {userList && <UserList userList={userList} />}
    </MainPageStyled>
  );
};

const mstp = (state) => ({
  userList: state.main.userList,
});

export const MainPage = connect(mstp, { setProfile, getUserList })(Main);
