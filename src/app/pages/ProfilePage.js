import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { signOut } from "../../redux/reducers/init";
import {
  getProfile,
  setProfileForm,
  createNewProfile,
} from "../../redux/reducers/main";

import { Welcome } from "../components/welcome/Welcome";
import { Cta } from "../components/cta/Cta";
import { FormProfile } from "../components/formprofile/FormProfile";
import { Controls } from "../components/controls/Controls";
// import { ButtonOutline } from "../components/buttons/ButtonOutline";

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
  signOut,
  createNewProfile,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) return getProfile(id);
    return getProfile(user.profileID);
  }, [id, getProfile]);

  if (!id && !user.userID) return <Redirect to="/" />;

  if (!profile) return <div></div>;

  return (
    <PageStyled>
      {profile.userID === user.userID && !user.profileID && (
        <div className="if_owner_wo_profile">
          <Welcome title={words.profileTitle} />

          <Cta
            isForm={isProfileForm}
            setForm={setProfileForm}
            buttonTtl={words.profileBtn}
            buttonIcon={icons.create}
          />

          {isProfileForm && <FormProfile createNewProfile={createNewProfile} />}
        </div>
      )}

      {profile.userID === user.userID && user.profileID && (
        <div className="if_owner_with_profile">
          <Controls signOut={signOut} />
        </div>
      )}

      {user.profileID && <ProfileStyled>
          <div></div>
        </ProfileStyled>}
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
  signOut,
  setProfileForm,
  createNewProfile,
})(Profile);
