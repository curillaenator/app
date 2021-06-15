import styled from "styled-components";

import { colors } from "../../../utils/colors";

const InputStyled = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }

  .input_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

  .input_input {
    width: 100%;
    height: 56px;
    margin-bottom: 4px;
    padding: 0 16px;
    border-radius: 16px;
    border: ${({ error }) =>
      error ? `1px solid ${colors.fontDanger}` : "none"};
    background-color: ${colors.bgLightGray};
    outline: none;

    &::placeholder {
      transition: 0.08s linear;
    }

    &:focus::placeholder {
      opacity: 0;
    }
  }

  .input_sub {
    width: 100%;
    min-height: 14px;
    padding-left: 12px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ error }) => (error ? colors.fontDanger : colors.fontPrimary)};
  }
`;

export const Textinput = ({
  input,
  meta,
  title = "",
  subtitle = "",
  ...props
}) => {
  const error = meta.touched && meta.error;

  return (
    <InputStyled error={error}>
      {title && <h2 className="input_title">{title}</h2>}
      <input {...input} {...props} className="input_input" />
      <div className="input_sub">{error ? meta.error : subtitle}</div>
    </InputStyled>
  );
};
