import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

const InputStyled = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }

  .input_textarea {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

  .textarea {
    width: 100%;
    min-height: 56px;
    padding: 16px;
    border-radius: 16px;
    border: ${({ error }) =>
      error ? `1px solid ${colors.fontDanger}` : "none"};
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

  .subtitle {
    width: 100%;
    min-height: 14px;
    padding-left: 12px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ error }) => (error ? colors.fontDanger : colors.fontPrimary)};
  }
`;

export const Textarea = ({
  input,
  meta,
  minRows = 5,
  title = "",
  subtitle = "",
  ...props
}) => {
  const error = meta.touched && meta.error;

  return (
    <InputStyled error={error}>
      {title && <h2 className="input_textarea">{title}</h2>}
      <TextareaAutosize
        {...input}
        {...props}
        minRows={minRows}
        onChange={input.onChange}
        className="textarea"
      />
      <div className="subtitle">{error ? meta.error : subtitle}</div>
    </InputStyled>
  );
};
