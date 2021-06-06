import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  setProfile,
  getUserList,
  setSearchForm,
} from "../../redux/reducers/main";

import { Welcome } from "../components/welcome/Welcome";
import { Cta } from "../components/cta/Cta";
import { SearchForm } from "../components/formsearch/FormSearch";
import { UserList } from "../components/userlist/UserList";

// import { colors } from "../../utils/colors";
import { words } from "../../utils/worder";

const MainPageStyled = styled.div``;

const Main = ({
  userList,
  setProfile,
  isSearchForm,
  getUserList,
  setSearchForm,
}) => {
  useEffect(() => getUserList(), [getUserList]);
  useEffect(() => setProfile(null), [setProfile]);

  return (
    <MainPageStyled>
      <Welcome title={words.mainTitle} />

      <Cta isSearchForm={isSearchForm} setSearchForm={setSearchForm} />

      {isSearchForm && <SearchForm />}

      {userList && <UserList userList={userList} />}
    </MainPageStyled>
  );
};

const mstp = (state) => ({
  userList: state.main.userList,
  isSearchForm: state.main.isSearchForm,
});

export const MainPage = connect(mstp, {
  setProfile,
  getUserList,
  setSearchForm,
})(Main);
