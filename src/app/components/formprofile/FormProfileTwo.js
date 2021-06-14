import { Form, Field } from "react-final-form";
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import ru from "date-fns/locale/ru";

import { TextInput } from "../inputs/Textinput";
import { Textarea } from "../inputs/Textarea";
import { Checkbox } from "../inputs/Checkbox";
import { Button } from "../buttons/Button";
import { ButtonGhost } from "../buttons/ButtonGhost";

import {
  required,
  minTextLength,
  composeValidators,
} from "../../../utils/validators";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";

registerLocale("ru", ru);

const DescriptionBlock = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }

  .block_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }
`;

const PeriodBlock = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  .block_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

  .block_checkbox {
    margin-bottom: 16px;
  }

  .block_date {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 700;
    // margin-bottom: 16px;
    border-radius: 16px;
    background-color: ${colors.bgLightGray};
    color: ${colors.primary};
    outline: none;
  }

  .react-datepicker-wrapper {
    width: 100%;
    height: 56px;

    .react-datepicker__input-container {
      width: 100%;
      height: 100%;
    }
  }
`;

const FormStyled = styled.form`
  margin-bottom: 56px;

  .form {
    margin-bottom: 32px;
    padding: 32px;
    border-radius: 24px;
    background-color: ${colors.bgShape};

    &__header {
      display: flex;
      justify-content: space-between;
      aling-items: center;

      &_title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 32px;
        color: ${colors.primary};
      }

      &_close {
      }
    }

    &__job {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &_period {
        flex-shrink: 0;
        width: 100%;
        margin-bottom: 32px;
      }

      &_description {
        width: 100%;
      }
    }
  }

  .form_buttons {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .form {
      &__job {
        flex-direction: row;

        &_period {
          width: 220px;
          margin-right: 48px;
          margin-bottom: 0;
        }

        &_description {
        }
      }
    }

    .form_buttons {
      justify-content: flex-start;
    }
  }
`;

export const FormProfileTwo = ({
  editID = null,
  initValues = {},
  add = false,
  edit = false,
  setForm = () => {},
  addJobExperience = () => {},
  updateJobExperience = () => {},
}) => {
  const dater = (dateStr) => (dateStr ? new Date(dateStr) : new Date());

  const initialValues = {
    ...initValues,
    startDate: dater(initValues.startDate),
    endDate: dater(initValues.endDate),
  };

  const onSubmit = (formData) => {
    if (formData.noEndDate) formData.endDate = false;

    setForm();
    if (!edit) return addJobExperience(formData);
    if (edit) return updateJobExperience(editID, formData);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => {
        //
        const periodOnChange = (date, name) => {
          if (name === "startDate") return form.change(name, date);
          if (name === "endDate") return form.change(name, date);
        };

        const closeForm = (e) => {
          e.preventDefault();
          setForm();
        };

        return (
          <FormStyled onSubmit={handleSubmit}>
            <div className="form">
              <div className="form__header">
                {!add && !edit && (
                  <h2 className="form__header_title">
                    {words.stage2form.stepTwo}
                  </h2>
                )}

                {add && (
                  <h2 className="form__header_title">
                    {words.stage2form.stepTwoAdd}
                  </h2>
                )}

                {edit && (
                  <h2 className="form__header_title">
                    {words.stage2form.stepTwoEdit}
                  </h2>
                )}

                {(add || edit) && (
                  <div className="form__header_close">
                    <ButtonGhost
                      icon={icons.close}
                      iconsize={32}
                      handler={closeForm}
                    />
                  </div>
                )}
              </div>

              <div className="form__job">
                <div className="form__job_period">
                  <PeriodBlock>
                    <h2 className="block_title">
                      {words.stage2form.workStart}
                    </h2>

                    <Field
                      name="startDate"
                      render={({ input, meta, ...props }) => (
                        <DatePicker
                          {...props}
                          className="block_date"
                          showPopperArrow={false}
                          locale="ru"
                          onChange={(dt) => periodOnChange(dt, input.name)}
                          selected={values.startDate}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          showFullMonthYearPicker
                          maxDate={new Date()}
                        />
                      )}
                    />
                  </PeriodBlock>

                  <PeriodBlock>
                    <h2 className="block_title">{words.stage2form.workEnd}</h2>

                    <div className="block_checkbox">
                      <Field
                        name="noEndDate"
                        render={Checkbox}
                        type="checkbox"
                        id="noEndDatePeriod"
                        title="По текущее время"
                      />
                    </div>

                    {!values.noEndDate && (
                      <Field
                        name="endDate"
                        render={({ input, meta, ...props }) => (
                          <DatePicker
                            {...props}
                            className="block_date"
                            showPopperArrow={false}
                            locale="ru"
                            onChange={(dt) => periodOnChange(dt, input.name)}
                            selected={values.endDate}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            showFullMonthYearPicker
                            maxDate={new Date()}
                          />
                        )}
                      />
                    )}
                  </PeriodBlock>
                </div>

                <div className="form__job_description">
                  <DescriptionBlock>
                    <h2 className="block_title">{words.stage2form.company}</h2>

                    <Field
                      name="company"
                      component={TextInput}
                      validate={composeValidators(required, minTextLength(3))}
                      placeholder={words.stage2form.companyPh}
                    />
                  </DescriptionBlock>

                  <DescriptionBlock>
                    <h2 className="block_title">
                      {words.stage2form.companyActivity}
                    </h2>

                    <Field
                      name="companyActivity"
                      component={TextInput}
                      validate={composeValidators(required, minTextLength(5))}
                      placeholder={words.stage2form.companyActivityPh}
                    />
                  </DescriptionBlock>

                  <DescriptionBlock>
                    <h2 className="block_title">
                      {words.stage2form.companySite}
                    </h2>

                    <Field
                      name="companySite"
                      component={TextInput}
                      placeholder={words.stage2form.companySitePh}
                    />
                  </DescriptionBlock>

                  <DescriptionBlock>
                    <h2 className="block_title">{words.stage2form.position}</h2>

                    <Field
                      name="position"
                      component={TextInput}
                      validate={composeValidators(required, minTextLength(3))}
                      placeholder={words.stage2form.positionPh}
                    />
                  </DescriptionBlock>

                  <DescriptionBlock>
                    <h2 className="block_title">{words.stage2form.duty}</h2>

                    <Field
                      name="duty"
                      component={Textarea}
                      validate={composeValidators(required, minTextLength(12))}
                      placeholder={words.stage2form.dutyPh}
                    />
                  </DescriptionBlock>
                </div>
              </div>
            </div>

            <div className="form_buttons">
              <Button
                title="Сохранить"
                width={256}
                icon={icons.success}
                disabled={submitting || pristine}
              />
            </div>
          </FormStyled>
        );
      }}
    />
  );
};
