import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

const InputStyled = styled.div`
  .textarea {
    width: 100%;
    min-height: 56px;
    padding: 16px;
    border-radius: 16px;
    background-color: ${colors.bgLightGray};
    color: ${colors.primary};
    line-height: 24px;
    resize: none;
    overflow-y: auto;
    outline: none;

    &::placeholder {
      transition: 0.08s;
    }

    &:focus::placeholder {
      opacity: 0;
    }
  }
`;

export const Textarea = ({ input, meta, minRows, ...props }) => {
  const error = meta.touched && meta.error;

  //     if (classN === "message") return { border: "1px solid #f2002c" };

  return (
    <InputStyled>
      <TextareaAutosize
        {...input}
        {...props}
        minRows={minRows}
        onChange={input.onChange}
        className="textarea"
      />
      {!error && <p className="sub">{props.sub}</p>}
      {error && <p className="sub_error">{meta.error}</p>}
    </InputStyled>
  );
};
