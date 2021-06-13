import styled from "styled-components";

import { colors } from "../../../utils/colors";

const InputStyled = styled.div`
  .textinput {
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

  .subtitle {
    width: 100%;
    min-height: 14px;
    margin-left: 12px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ error }) => (error ? colors.fontDanger : colors.fontPrimary)};
  }
`;

export const TextInput = ({ input, meta, subtitle, ...props }) => {
  const error = meta.touched && meta.error;
  

  return (
    <InputStyled error={error}>
      <input {...input} {...props} className="textinput" />
      <div className="subtitle">{error ? meta.error : subtitle}</div>
    </InputStyled>
  );
};
