import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  setProfile,
  getProfileList,
  setSearchForm,
  handleStarred,
} from "../../redux/reducers/main";

import { LoaderLocal } from "../components/loader/LoaderLocal";
import { Welcome } from "../components/welcome/Welcome";
import { Cta } from "../components/cta/Cta";
import { SearchForm } from "../components/formsearch/FormSearch";
import { UserList } from "../components/userlist/UserList";

import { icons } from "../../utils/icons";
import { words } from "../../utils/worder";

const MainPageStyled = styled.div``;

const Main = ({
  isMobile,
  user,
  loadProfileList,
  profileList,
  setProfile,
  isSearchForm,
  getProfileList,
  setSearchForm,
  handleStarred,
}) => {
  useEffect(() => setProfile(null), [setProfile]);

  useEffect(() => {
    profileList.length === 0 && getProfileList();
  }, [profileList.length, getProfileList]);

  return (
    <MainPageStyled>
      <Welcome title={words.mainTitle} />

      <Cta
        isForm={isSearchForm}
        setForm={setSearchForm}
        buttonTtl={words.searchBtn}
        buttonIcon={icons.search}
      />

      {isSearchForm && <SearchForm />}

      {loadProfileList && <LoaderLocal />}

      {!loadProfileList && (
        <UserList
          profileList={profileList}
          isMobile={isMobile}
          userID={user && user.userID}
          starred={user && user.userID ? user.starred : {}}
          handleStarred={handleStarred}
        />
      )}
    </MainPageStyled>
  );
};

const mstp = (state) => ({
  user: state.init.user,
  isMobile: state.main.isMobile,
  loadProfileList: state.main.loadProfileList,
  profileList: state.main.profileList,
  isSearchForm: state.main.isSearchForm,
});

export const MainPage = connect(mstp, {
  setProfile,
  getProfileList,
  setSearchForm,
  handleStarred,
})(Main);
