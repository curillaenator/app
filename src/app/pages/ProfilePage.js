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

import { LoaderLocal } from "../components/loader/LoaderLocal";
import { Welcome } from "../components/welcome/Welcome";
// import { ButtonGhost } from "../components/buttons/ButtonGhost";
import { Controls } from "../components/controls/Controls";
import { Cta } from "../components/cta/Cta";
import { FormProfile } from "../components/formprofile/FormProfile";

import { words } from "../../utils/worder";
import { icons } from "../../utils/icons";
import { colors } from "../../utils/colors";

const PageStyled = styled.div``;

const ProfileBlockOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .photo {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 0;
    padding-top: 150%;

    &_main {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      object-fit: cover;
    }

    &_blur {
      transform: translateY(24px);
      filter: blur(20px) opacity(75%);
    }
  }

  .meta {
    width: calc(70% - 64px);
    padding-top: 32px;

    &_name {
      margin-bottom: 32px;
      font-size: 22px;
      font-weight: 800;
    }

    &_string {
      margin-bottom: 24px;

      &-title {
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 600;
        color: ${colors.fontTitle};
      }

      &-data {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    .photo {
      width: 30%;
      padding-top: 45%;
    }
  }
`;

const Profile = ({
  isMobile,
  user,
  loadProfile,
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
    if (!id && user.userID) return getProfile(user.profileID);
  }, [id, user.profileID, user.userID, getProfile]);

  if (!id && !user.userID) return <Redirect to="/" />;

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

      {loadProfile && <LoaderLocal />}

      {!loadProfile && profile && (
        <Controls
          isMobile={isMobile}
          isOwner={user && user.userID === profile.userID}
          removeProfile={() => removeProfile(user.profileID)}
        />
      )}

      {!loadProfile && profile && (
        <ProfileBlockOne>
          <div className="photo">
            <img
              className="photo_main photo_blur"
              src={profile.avatarURL}
              alt={profile.name}
            />

            <img
              className="photo_main"
              src={profile.avatarURL}
              alt={profile.name}
            />
          </div>

          <div className="meta">
            <h3 className="meta_name">{profile.name}</h3>

            <div className="meta_string">
              <h4 className="meta_string-title">Специализация:</h4>
              <div className="meta_string-data">{profile.job}</div>
            </div>

            <div className="meta_string">
              <h4 className="meta_string-title">IT скиллс:</h4>
              <div className="meta_string-data">{profile.skills}</div>
            </div>

            <div className="meta_string">
              <h4 className="meta_string-title">Стаж работы:</h4>
              <div className="meta_string-data">
                {profile.fullperiod ? profile.fullperiod : "не указан"}
              </div>
            </div>
          </div>
        </ProfileBlockOne>
      )}
    </PageStyled>
  );
};

const mstp = (state) => ({
  isMobile: state.main.isMobile,
  user: state.init.user,
  loadProfile: state.main.loadProfile,
  profile: state.main.profile,
  isProfileForm: state.main.isProfileForm,
});

export const ProfilePage = connect(mstp, {
  getProfile,
  setProfileForm,
  createProfile,
  removeProfile,
})(Profile);
