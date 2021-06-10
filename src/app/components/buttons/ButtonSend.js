import styled from "styled-components";

import { colors } from "../../../utils/colors";

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: fit-content;
  height: 56px;
  padding: 0 32px;
  border-radius: 0 16px 16px 0;
  background-color: ${colors.primary};
  font-size: 14px;
  font-weight: 700;
  color: ${colors.fontLightGray};
  cursor: pointer;
  transition: 0.08s linear;

  & > svg {
    width: ${({ iconsize }) => iconsize}px;
    height: ${({ iconsize }) => iconsize}px;
    margin-right: ${({ title }) => (title ? "8px" : "0px")};
    fill: ${colors.fontLightGray};
  }

  &:hover {
    background-color: ${colors.primaryHover};
  }

  &:active {
    background-color: ${colors.primary};
  }
`;

export const ButtonSend = ({
  title = "",
  icon = null,
  iconsize = 18,
  handler = () => console.log("send"),
}) => {
  return (
    <ButtonStyle title={title} iconsize={iconsize} onClick={handler}>
      {icon && icon}
      {title && title}
    </ButtonStyle>
  );
};
