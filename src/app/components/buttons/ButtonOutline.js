import styled from "styled-components";

import { colors } from "../../../utils/colors";

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 38px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid ${({ fontColor }) => fontColor};
  background-color: ${colors.bgLightGray};
  font-size: 14px;
  font-weight: 700;
  transition: 0.08s linear;
  will-change: filter;
  color: ${({ fontColor }) => fontColor};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  & > svg {
    width: ${({ iconsize }) => iconsize}px;
    height: ${({ iconsize }) => iconsize}px;
    fill: ${({ fontColor }) => fontColor};
    margin-right: ${({ title }) => (title ? "8px" : "0")};
    transition: 0.08s linear;
  }

  &:hover {
    border: 2px solid ${({ fontColorHov }) => fontColorHov};
    color: ${({ fontColorHov }) => fontColorHov};

    & > svg {
      fill: ${({ fontColorHov }) => fontColorHov};
    }
  }

  &:active {
    border: 2px solid ${({ fontColor }) => fontColor};
    color: ${({ fontColor }) => fontColor};

    & > svg {
      fill: ${({ fontColor }) => fontColor};
    }
  }
`;

export const ButtonOutline = ({
  icon,
  iconsize = 18,
  title,
  active = false,
  danger = false,
  disabled = false,
  handler = () => console.log("button"),
}) => {
  const fontColor = () => {
    if (disabled) return colors.fontDisabled;
    if (active) return colors.fontActive;
    if (danger) return colors.fontDanger;
    return colors.primary;
  };

  const fontColorHover = () => {
    if (disabled) return colors.fontDisabled;
    if (active) return colors.fontActive;
    if (danger) return colors.fontDanger;
    return colors.fontTitle;
  };

  return (
    <ButtonStyled
      iconsize={iconsize}
      fontColor={fontColor()}
      fontColorHov={fontColorHover()}
      title={title}
      disabled={disabled}
      onClick={handler}
    >
      {icon && icon}
      {title}
    </ButtonStyled>
  );
};
