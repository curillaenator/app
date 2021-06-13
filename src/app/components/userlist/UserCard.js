import { Link } from "react-router-dom";
import styled from "styled-components";

import { ButtonGhost } from "../buttons/ButtonGhost";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const PhotoStyled = styled(Link)`
  flex-shrink: 0;
  position: relative;
  width: 30%;
  height: 0;
  padding-top: 75%;
  border-radius: 16px 0 0 16px;
  text-decoration: none;
  overflow: hidden;

  .photo_img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 480px) {
    padding-top: 70%;
  }

  @media (min-width: 640px) {
    padding-top: 50%;
  }

  @media (min-width: 768px) {
    padding-top: 70%;
  }

  @media (min-width: 1024px) {
    padding-top: 65%;
  }

  @media (min-width: 1280px) {
    padding-top: 50%;
  }
`;

const MetaRow = styled.div`
  min-height: ${({ rows }) => rows * 16}px;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? 800 : 600)};
  color: ${({ lighten }) => (lighten ? colors.fontTitle : colors.fontPrimary)};

  display: -webkit-box;
  -webkit-line-clamp: ${({ rows }) => rows};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaStyled = styled(Link)`
  text-decoration: none;
  height: calc(100% - 48px);
  padding: 16px;

  .title {
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 800;
    color: ${colors.fontPrimary};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // .data_onerow {
  //   margin-bottom: 4px;
  //   font-size: 14px;
  //   font-weight: 600;
  //   color: ${colors.fontPrimary};
  //   overflow: hidden;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  // }

  // .data_tworows {
  //   margin-bottom: 4px;
  //   font-size: 14px;
  //   font-weight: 600;
  //   color: ${colors.fontPrimary};
  //   display: -webkit-box;
  //   -webkit-line-clamp: 2;
  //   -webkit-box-orient: vertical;
  //   overflow: hidden;
  // }

  // .highlight {
  //   font-weight: 800;
  //   color: ${colors.fontTitle};
  // }

  @media (min-width: 480px) {
    padding: 24px;

    .title {
      font-size: 22px;
    }

    .data {
      margin-bottom: 8px;
      font-size: 16px;
    }
  }

  @media (min-width: 768px) {
    padding: 16px;

    .title {
      font-size: 18px;
    }

    .data {
      margin-bottom: 4px;
      font-size: 14px;
    }
  }

  @media (min-width: 1024px) {
    padding: 24px;

    .title {
      font-size: 22px;
    }

    .data {
      margin-bottom: 8px;
      font-size: 16px;
    }
  }
`;

const CardStyled = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  background-color: ${colors.bgWhite};
  border-radius: 16px;
  overflow: hidden;
  transition: 0.08s linear;

  .card_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;

    &-controls {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-end;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }

  &:hover {
    transform: scale(1.012);
    filter: drop-shadow(0 12px 12px ${colors.shadow});
  }

  // &:active {
  //   transform: scale(1);
  //   filter: none;
  // }

  @media (min-width: 768px) {
    width: calc(100% / 2 - 16px);
  }
`;

export const UserCard = ({
  userID,
  isMobile,
  profile,
  starred,
  handleStarred,
}) => {
  const starredProfiles = starred ? Object.keys(starred) : [];

  const isStarred = starredProfiles.includes(profile.profileID);

  return (
    <CardStyled>
      <PhotoStyled to={`/profile/${profile.profileID}`}>
        <img className="photo_img" src={profile.avatarURL} alt={profile.name} />
      </PhotoStyled>

      <div className="card_info">
        <MetaStyled to={`/profile/${profile.profileID}`}>
          <div className="title">{profile.name}</div>

          <MetaRow rows={2} lighten bold>
            {profile.job}
          </MetaRow>

          <MetaRow rows={1}>{profile.city}</MetaRow>

          <MetaRow rows={1}>Стаж {profile.jobExpTotal}</MetaRow>

          <MetaRow rows={2}>Языки: {profile.languages}</MetaRow>
        </MetaStyled>

        {userID && profile.userID !== userID && (
          <div className="card_info-controls">
            <ButtonGhost
              title={
                isMobile ? "" : isStarred ? "Снять отметку" : "В избранное"
              }
              icon={icons.star}
              iconsize={isMobile ? 24 : 18}
              handler={() => handleStarred(profile.profileID)}
              active={isStarred}
            />
          </div>
        )}
      </div>
    </CardStyled>
  );
};
