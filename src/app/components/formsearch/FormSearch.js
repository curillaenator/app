import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { ButtonSend } from "../buttons/ButtonSend";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";

const FormStyled = styled.form`
  margin-bottom: 56px;
  padding: 32px;
  border-radius: 24px;
  background-color: ${colors.bgShape};

  .form_title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 32px;
    color: ${colors.primary};
  }

  .form_search {
    display: flex;
    align-items: center;

    & > input {
      width: 100%;
      height: 56px;
      padding: 0 16px;
      border-radius: 16px 0 0 16px;
      background-color: ${colors.bgLightGray};
      outline: none;

      &::placeholder {
        transition: 0.08s linear;
      }

      &:focus::placeholder {
        opacity: 0;
      }
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 64px;
  }
`;

export const SearchForm = () => {
  const onSubmit = (searchData) => console.log(searchData);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <FormStyled onSubmit={handleSubmit}>
            <h3 className="form_title">Поиск пока не активен</h3>

            <div className="form_search">
              <Field
                name="search"
                component="input"
                placeholder={words.searchPh}
              />

              <ButtonSend title="Найти" />
            </div>
          </FormStyled>
        );
      }}
    />
  );
};
