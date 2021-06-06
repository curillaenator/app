import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { signOut } from "../../redux/reducers/init";
import { getProfile } from "../../redux/reducers/main";

import { Welcome } from "../components/welcome/Welcome";
import { ButtonOutline } from "../components/buttons/ButtonOutline";

import { colors } from "../../utils/colors";
import { words } from "../../utils/worder";

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 32px auto;
  padding: 56px 0;
  border-radius: 24px;
  border: 2px solid ${colors.primary};
  background-color: ${colors.bgWhite};

  .avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 256px;
    margin-bottom: 32px;
    padding: 0 32px;
    flex-shrink: 0;

    &_img {
      width: 192px;
      height: 192px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .meta {
    width: 100%;

    &_name {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 700;
    }

    &_buttons {
      display: flex;
      flex-direction: column;
      align-items: center;

      &_btn {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 64px auto;
    border-radius: 0;
    border-right: 0;
    border-left: 0;
    background-color: transparent;

    .avatar {
      width: 30%;
      margin-bottom: 0;
    }

    .meta {
      width: calc(70% - 32px);

      &_name {
        justify-content: flex-start;
        margin-bottom: 0;
      }

      &_buttons {
        flex-direction: row;

        &_btn {
          margin-right: 16px;
          margin-bottom: 0;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
`;

const PageStyled = styled.div``;

const Profile = ({ user, profile, getProfile, signOut }) => {
  const { id } = useParams();

  useEffect(() => id && getProfile(id), [id, getProfile]);

  const data = id ? profile : user;

  if (!id && !user.userID) return <Redirect to="/" />;

  if (!data) return <div>Загрузка</div>;

  return (
    <PageStyled>
      <Welcome title={words.profileTitle} />

      <ProfileStyled>
        <div className="avatar">
          <img className="avatar_img" src={data.avatar} alt={data.username} />
        </div>
        <div className="meta">
          <div className="meta_name">{data.username}</div>

          {data.userID === user.userID && (
            <div className="meta_buttons">
              <div className="meta_buttons_btn">
                <ButtonOutline title="Редактировать" />
              </div>
              <div className="meta_buttons_btn">
                <ButtonOutline title="Выйти" handler={signOut} />
              </div>
            </div>
          )}
        </div>
      </ProfileStyled>
    </PageStyled>
  );
};

const mstp = (state) => ({
  user: state.init.user,
  profile: state.main.profile,
});

export const ProfilePage = connect(mstp, { getProfile, signOut })(Profile);
