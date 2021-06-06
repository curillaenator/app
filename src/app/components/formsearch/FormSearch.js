import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

const FormStyled = styled.form`
  margin-bottom: 56px;
  padding: 32px;
  border-radius: 24px;
  background-color: ${colors.bgShape};

  .form_title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  .form_search {
    display: flex;
    align-items;:center;

    & > input {
      width: 100%;
      height: 56px;
      padding: 0 16px;
      border-radius: 16px 0 0 16px;
      background-color: ${colors.bgLightGray};
      outline: none;
    }

    &_btn {
      flex-shrink: 0;
      padding: 0 32px;
      border-radius: 0 16px 16px 0;
      background-color: ${colors.primary};
      font-size: 14px;
      font-weight: 700;
      color: ${colors.fontLightGray};
      cursor: pointer;
      transition: 0.08s linear;

      &:hover {
        opacity: 0.85;
      }
      &:active {
        opacity: 1;
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
            <h3 className="form_title">Кого вы ищите?</h3>

            <div className="form_search">
              <Field name="search" component="input" />

              <button className="form_search_btn">Найти</button>
            </div>
          </FormStyled>
        );
      }}
    />
  );
};
