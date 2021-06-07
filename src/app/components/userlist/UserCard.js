import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

const CardStyled = styled(Link)`
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  background-color: ${colors.bgWhite};
  border-radius: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: 0.08s linear;

  .avatar {
    position: relative;
    width: 30%;
    height: 0;
    padding-top: 45%;
    border-radius: 16px;
    overflow: hidden;

    &_img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .meta {
    width: 70%;
    padding: 24px;

    &_big {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 24px;
      font-weight: 700;
      color: ${colors.primary};
    }

    &_small {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${colors.fontTitle};
    }
  }

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 12px 12px ${colors.shadow});
  }

  &:active {
    transform: scale(1);
    filter: none;
  }

  @media (min-width: 768px) {
    width: calc(100% / 2 - 16px);
  }
`;

export const UserCard = ({ profile }) => {
  return (
    <CardStyled to={`/profile/${profile.profileID}`}>
      <div className="avatar">
        <img
          className="avatar_img"
          src={profile.avatarURL}
          alt={profile.name}
        />
      </div>

      <div className="meta">
        <div className="meta_big">
          {/* <span style={{ color: colors.fontTitle }}></span> */}
          {profile.name}
        </div>

        <div className="meta_small">{profile.job}</div>
      </div>
    </CardStyled>
  );
};
