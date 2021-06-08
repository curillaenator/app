import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  setProfile,
  getProfileList,
  setSearchForm,
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
  loadProfileList,
  profileList,
  setProfile,
  isSearchForm,
  getProfileList,
  setSearchForm,
}) => {
  useEffect(() => getProfileList(), [getProfileList]);
  useEffect(() => setProfile(null), [setProfile]);

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

      {!loadProfileList && <UserList profileList={profileList} />}
    </MainPageStyled>
  );
};

const mstp = (state) => ({
  loadProfileList: state.main.loadProfileList,
  profileList: state.main.profileList,
  isSearchForm: state.main.isSearchForm,
});

export const MainPage = connect(mstp, {
  setProfile,
  getProfileList,
  setSearchForm,
})(Main);
