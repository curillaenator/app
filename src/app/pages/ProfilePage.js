import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { signOut } from "../../redux/reducers/init";
import { getProfile } from "../../redux/reducers/main";

import { ButtonOutline } from "../components/buttons/ButtonOutline";

import { colors } from "../../utils/colors";

const ProfileStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 64px auto;
  padding: 56px 0;
  border: 2px solid ${colors.primary};
  border-right: 0;
  border-left: 0;

  .avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    min-width: 256px;
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
    width: calc(70% - 32px);

    &_name {
      display: flex;
      align-items: center;
      height: 64px;
      font-size: 24px;
      font-weight: 700;
    }

    &_buttons {
      display: flex;
      align-items: center;

      &_btn {
        margin-right: 16px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

const Profile = ({ user, profile, getProfile, signOut }) => {
  const { id } = useParams();

  useEffect(() => id && getProfile(id), [id, getProfile]);

  const data = id ? profile : user;

  if (!id && !user.userID) return <Redirect to="/" />;

  if (!data) return <div>Загрузка</div>;

  return (
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
  );
};

const mstp = (state) => ({
  user: state.init.user,
  profile: state.main.profile,
});

export const ProfilePage = connect(mstp, { getProfile, signOut })(Profile);
