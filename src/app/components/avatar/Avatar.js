import styled from "styled-components";

import { colors } from "../../../utils/colors";

const AvatarStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin: ${({ margin }) => margin};

  .image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    will-change: filter;
    filter: drop-shadow(
      0 12px 8px ${({ shadow }) => (shadow ? colors.shadow : "transparent")}
    );
  }

  .notification {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -4px;
    right: -4px;
    width: 24px;
    height: 24px;
    padding-bottom: 3px;
    border-radius: 50%;
    background-color: ${colors.fontDanger};
    font-weight: 800;
    color: ${colors.fontWhite};
    opacity: ${({ isNote }) => (isNote ? 1 : 0)};
    transition: 0.08s linear;
  }
`;

export const Avatar = ({
  imgSrc,
  username,
  notesNum,
  shadow = false,
  size = 64,
  margin = "0",
}) => {
  return (
    <AvatarStyled
      isNote={notesNum > 0}
      size={size}
      margin={margin}
      shadow={shadow}
    >
      <img className="image" src={imgSrc} alt={username} />
      <div className="notification">{notesNum}</div>
    </AvatarStyled>
  );
};
