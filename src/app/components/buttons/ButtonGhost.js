import styled from "styled-components";

import { colors } from "../../../utils/colors";

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 40px;
  padding: 16px;
  font-size: 14px;
  font-weight: 700;
  transition: 0.08s linear;
  will-change: filter;
  color: ${({ fontColor }) => fontColor};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  & > svg {
    width: 18px;
    height: 18px;
    fill: ${({ fontColor }) => fontColor};
    margin-right: ${({ title }) => (title ? "8px" : "0")};
    transition: 0.08s linear;
  }

  &:hover {
    color: ${colors.fontTitle};

    & > svg {
      fill: ${colors.fontTitle};
    }
  }

  &:active {
    color: ${({ fontColor }) => fontColor};

    & > svg {
      fill: ${({ fontColor }) => fontColor};
    }
  }
`;

export const ButtonGhost = ({
  icon,
  title,
  active = false,
  danger = false,
  disabled = false,
  handler = () => console.log("button"),
}) => {
  const fontColor = () => {
    if (disabled) return colors.fontDisabled;
    if (danger) return colors.fontDanger;
    if (active) return colors.fontActive;
    return colors.primary;
  };

  return (
    <ButtonStyled
      fontColor={fontColor()}
      title={title}
      disabled={disabled}
      onClick={handler}
    >
      {icon && icon}
      {title}
    </ButtonStyled>
  );
};
