import { useState } from "react";
import parse from "html-react-parser";
import styled from "styled-components";

import { ButtonGhost } from "../buttons/ButtonGhost";
import { FormProfileOne } from "../formprofile/FormProfileOne";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const BlockOneStyled = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 56px;

    .photo {
      position: relative;
      flex-shrink: 0;
      width: 100%;
      height: 0;
      margin-bottom: 32px;
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
        will-change: filter;
        transform: translateY(24px);
        filter: blur(20px) opacity(75%);
      }
    }

    .meta {
      width: 100%;
      padding: 24px;
      border-radius: 16px;
      background-color: ${colors.bgWhite};

      &_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;

        &-name {
          font-size: 22px;
          font-weight: 800;
        }

        &-edit {
        }
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

        &-databold {
          font-size: 16px;
          font-weight: 800;
        }
      }
    }
  }

  @media (min-width: 768px) {
    .container {
      flex-direction: row;

      .photo {
        width: 30%;
        padding-top: 45%;
        margin-bottom: 0;
      }

      .meta {
        width: calc(70% - 48px);
      }
    }
  }
`;

export const ProfileBlockOne = ({
  isOwner,
  isMobile,
  profile,
  editProfile,
}) => {
  const [editForm, setEditForm] = useState(false);

  return (
    <BlockOneStyled>
      {editForm && (
        <FormProfileOne
          initValues={profile}
          edit
          setForm={() => setEditForm(false)}
          editProfile={editProfile}
        />
      )}

      {!editForm && (
        <div className="container">
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
            <div className="meta_header">
              <h3 className="meta_header-name">{profile.name}</h3>

              {isOwner && (
                <div className="meta_header-edit">
                  <ButtonGhost
                    title={isMobile ? "" : "Редактировать"}
                    icon={icons.edit}
                    iconsize={isMobile ? 26 : 18}
                    handler={() => setEditForm(true)}
                  />
                </div>
              )}
            </div>

            <div className="meta_string">
              <h4 className="meta_string-title">Специализация:</h4>
              <div className="meta_string-databold">{profile.job}</div>
            </div>

            <div className="meta_string">
              <h4 className="meta_string-title">Город:</h4>
              <div className="meta_string-data">{profile.city}</div>
            </div>

            {!isOwner && (
              <div className="meta_string">
                <h4 className="meta_string-title">Стаж работы:</h4>
                <div className="meta_string-data">{profile.jobExpTotal}</div>
              </div>
            )}

            {profile.skillsHTML && (
              <div className="meta_string">
                <h4 className="meta_string-title">Навыки:</h4>
                <div className="meta_string-data">
                  {parse(profile.skillsHTML)}
                </div>
              </div>
            )}

            {profile.languages && (
              <div className="meta_string">
                <h4 className="meta_string-title">Говорю на языках:</h4>
                <div className="meta_string-data">{profile.languages}</div>
              </div>
            )}

            {profile.languagesIT && (
              <div className="meta_string">
                <h4 className="meta_string-title">Пишу на языках:</h4>
                <div className="meta_string-data">{profile.languagesIT}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </BlockOneStyled>
  );
};
