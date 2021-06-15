import styled from "styled-components";

import { colors } from "../../../utils/colors";

const shapeColor = ({ base, active, disabled }) => {
  if (active || disabled) return colors.primaryActive;
  return base;
};

const shapeFilter = ({ params, active, disabled }) => {
  if (active || disabled) return "none";
  return params;
};

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: 0.08s linear;
  will-change: transform;

  &:hover {
    transform: ${({ disabled, active }) =>
      disabled || active ? "scale(1)" : "scale(1.02)"};
  }

  &:active {
    transform: scale(1);
  }

  .shape {
    will-change: filter;
    position: absolute;
    top: 0;
    left: 0;
    fill: ${(props) => shapeColor({ ...props, base: colors.primary })};
    filter: drop-shadow(
      ${(props) => shapeFilter({ ...props, params: "0 8px 8px #36363631" })}
    );
    transition: 0.08s linear;
    z-index: -1;
  }

  &:hover .shape {
    fill: ${(props) => shapeColor({ ...props, base: colors.primaryHover })};
    filter: drop-shadow(
      ${(props) => shapeFilter({ ...props, params: "0 12px 12px #36363631" })}
    );
  }

  &:active .shape {
    fill: ${(props) => shapeColor({ ...props, base: colors.primary })};
    filter: none;
  }

  .icon {
    width: 18px;
    height: 18px;
    margin-right: ${({ title }) => (title ? "12px" : "0px")};

    & > svg {
      width: 18px;
      height: 18px;
      fill: ${({ active }) => (active ? colors.primary : colors.fontLightGray)};
    }
  }

  .title {
    width: fit-content;
    color: ${({ active }) => (active ? colors.primary : colors.fontLightGray)};
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    transition: 0.08s linear;
  }
`;

export const Button = ({
  width = 217,
  height = 56,
  smoothQ = 98,
  radius = 23.33,
  icon,
  title = "",
  active = false,
  disabled = false,
  handler = () => console.log("cta empty"),
}) => {
  const W = width;
  const H = height;
  const R = H / 2 < radius ? H / 2 : radius; // 2.4
  const S = (0.08 + R * 0.000012) * smoothQ - 4 / smoothQ - 3;

  return (
    <ButtonStyled
      width={width}
      height={height}
      title={title}
      active={active}
      disabled={disabled}
      onClick={handler}
    >
      <svg
        className="shape"
        version="1.1"
        width="100%"
        height="100%"
        shapeRendering="geometricPrecision"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${R} 0 H${W - R} C ${W - S} 0 ${W} ${S} ${W} ${R}
          V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
          H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
          V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`}
        ></path>
      </svg>

      {icon && <div className="icon">{icon}</div>}

      {title && <div className="title">{title}</div>}
    </ButtonStyled>
  );
};
