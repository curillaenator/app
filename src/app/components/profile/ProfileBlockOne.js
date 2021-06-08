import styled from "styled-components";

import { colors } from "../../../utils/colors";

const BlockOneStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 56px;

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
    width: 100%;
    padding: 32px 32px 0 0;

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

    .meta {
      width: calc(70% - 64px);
    }
  }
`;

export const ProfileBlockOne = ({ profile }) => {
  return (
    <BlockOneStyled>
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
    </BlockOneStyled>
  );
};
