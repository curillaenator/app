import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import {
  getProfile,
  setStage1Form,
  setStage2Form,
  createProfile,
  removeProfile,
} from "../../redux/reducers/main";

import { LoaderLocal } from "../components/loader/LoaderLocal";
import { Welcome } from "../components/welcome/Welcome";
// import { ButtonGhost } from "../components/buttons/ButtonGhost";
import { Controls } from "../components/controls/Controls";
import { Cta } from "../components/cta/Cta";
import { FormProfileOne } from "../components/formprofile/FormProfileOne";
import { ProfileBlockOne } from "../components/profile/ProfileBlockOne";

import { words } from "../../utils/worder";
import { icons } from "../../utils/icons";
// import { colors } from "../../utils/colors";

const PageStyled = styled.div``;

const Profile = ({
  isMobile,
  user,
  loadProfile,
  profile,
  isStage1Form,
  setStage1Form,
  isStage2Form,
  setStage2Form,
  getProfile,
  createProfile,
  removeProfile,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) return getProfile(id);
    if (!id && user.userID) return getProfile(user.profileID);
  }, [id, user.profileID, user.userID, getProfile]);

  if (!id && !user.userID) return <Redirect to="/" />;

  return (
    <PageStyled>
      {loadProfile && <LoaderLocal />}

      {!id && user.userID && !user.profileID && (
        <div className="if_owner_with_no_profile_yet">
          <Welcome title={words.profileTitle} />

          <Cta
            isForm={isStage1Form}
            setForm={setStage1Form}
            buttonTtl={words.profileBtn}
            buttonIcon={icons.create}
          />

          {isStage1Form && <FormProfileOne createProfile={createProfile} />}
        </div>
      )}

      {!loadProfile && profile && (
        <div className="if_owner_with_profile_stage1">
          <Controls
            isMobile={isMobile}
            isOwner={user && user.userID === profile.userID}
            removeProfile={() => removeProfile(user.profileID)}
          />

          <ProfileBlockOne profile={profile} />
        </div>
      )}

      {!loadProfile && profile && profile.stage === 1 && (
        <div>
          <Cta
            isForm={isStage2Form}
            setForm={setStage2Form}
            buttonTtl={words.stage2btn}
            buttonIcon={icons.create}
          />

          {isStage2Form && <FormProfileOne createProfile={createProfile} />}
        </div>
      )}
    </PageStyled>
  );
};

const mstp = (state) => ({
  isMobile: state.main.isMobile,
  user: state.init.user,
  loadProfile: state.main.loadProfile,
  profile: state.main.profile,
  isStage1Form: state.main.isStage1Form,
  isStage2Form: state.main.isStage2Form,
});

export const ProfilePage = connect(mstp, {
  getProfile,
  setStage1Form,
  setStage2Form,
  createProfile,
  removeProfile,
})(Profile);
