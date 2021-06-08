import styled from "styled-components";

import { colors } from "../../../utils/colors";

const InputStyled = styled.div`
  .textinput {
    width: 100%;
    height: 56px;
    padding: 0 16px;
    border-radius: 16px;
    background-color: ${colors.bgLightGray};
    outline: none;

    &::placeholder {
      transition: 0.08s linear;
    }

    &:focus::placeholder {
      opacity: 0;
    }

    .sub {
    }

    .sub_error {
      border: 1px solid ${colors.fontDanger};
    }
  }
`;

export const TextInput = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error;

  return (
    <InputStyled>
      <input {...input} {...props} className="textinput" />

      {!error && <div className="sub">{props.sub}</div>}
      {error && <p className="sub sub_error">{meta.error}</p>}
    </InputStyled>
  );
};
