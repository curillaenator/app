import styled from "styled-components";

import { colors } from "../../../utils/colors";

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid ${({ fontColor }) => fontColor};
  font-size: 14px;
  font-weight: 700;
  transition: 0.08s linear;
  will-change: filter;
  color: ${({ fontColor }) => fontColor};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  & > svg {
    margin-right: ${({ title }) => (title ? "8px" : "0")};
  }

  &:hover {
    transform: ${({ disabled }) =>
      disabled ? "none" : "scale3d(1.02, 1.02, 1)"};
    filter: ${({ disabled }) =>
      disabled ? "default" : "drop-shadow(0 6px 4px #36363631)"};
  }

  &:active {
    transform: scale3d(1, 1, 1);
    filter: none;
  }
`;

export const ButtonOutline = ({
  width = 128,
  height = 38,
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
      width={width}
      height={height}
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
