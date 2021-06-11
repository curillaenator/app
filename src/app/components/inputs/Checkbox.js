import styled from "styled-components";

import { colors } from "../../../utils/colors";

import check from "../../../assets/icons/check.svg";

const InputStyled = styled.div`
  .checkbox {
    position: relative;

    & > input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: -20;
    }

    & > label {
      user-select: none;
    }

    & > input + label {
      position: relative;
      margin-left: 40px;
      font-weight: 600;
      cursor: pointer;
    }

    & > input + label:before {
      content: "";
      position: absolute;
      top: 50%;
      left: -40px;
      width: 32px;
      height: 32px;
      border-radius: 12px;
      background-color: ${colors.bgLightGray};
      border: 2px solid ${colors.primary};
      transform: translateY(-50%);
      background-position: center;
      background-size: 60%;
      background-repeat: no-repeat;
    }

    & > input:checked + label::before {
      background-image: url(${check});
    }
  }
`;

export const Checkbox = ({ input, meta, id, title, setActive }) => {
  console.log(meta);
  return (
    <InputStyled>
      <div className="checkbox">
        <input type="checkbox" id={id} {...input} />

        <label htmlFor={id} onClick={() => setActive(!input.checked)}>
          {title}
        </label>
      </div>
    </InputStyled>
  );
};
