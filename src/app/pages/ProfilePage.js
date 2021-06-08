import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import {
  getProfile,
  setProfileForm,
  createProfile,
  removeProfile,
} from "../../redux/reducers/main";

import { Welcome } from "../components/welcome/Welcome";
import { Cta } from "../components/cta/Cta";
import { FormProfile } from "../components/formprofile/FormProfile";

// import { colors } from "../../utils/colors";
import { words } from "../../utils/worder";
import { icons } from "../../utils/icons";

const PageStyled = styled.div``;

const ProfileStyled = styled.div``;

const Profile = ({
  user,
  profile,
  isProfileForm,
  setProfileForm,
  getProfile,
  createProfile,
  removeProfile,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) return getProfile(id);
    return getProfile(user.profileID);
  }, [id, user.profileID, getProfile]);

  if (!id && !user.userID) return <Redirect to="/" />;

  if (!user) return <div></div>;

  return (
    <PageStyled>
      {!id && user.userID && !user.profileID && (
        <div className="if_owner_wo_profile">
          <Welcome title={words.profileTitle} />

          <Cta
            isForm={isProfileForm}
            setForm={setProfileForm}
            buttonTtl={words.profileBtn}
            buttonIcon={icons.create}
          />

          {isProfileForm && <FormProfile createProfile={createProfile} />}
        </div>
      )}

      <ProfileStyled>
        <div></div>
      </ProfileStyled>
    </PageStyled>
  );
};

const mstp = (state) => ({
  user: state.init.user,
  profile: state.main.profile,
  isProfileForm: state.main.isProfileForm,
});

export const ProfilePage = connect(mstp, {
  getProfile,
  setProfileForm,
  createProfile,
  removeProfile,
})(Profile);
