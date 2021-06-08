import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import ru from "date-fns/locale/ru";

import { TextInput } from "../inputs/Textinput";
import { Textarea } from "../inputs/Textarea";
import { Button } from "../buttons/Button";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";

registerLocale("ru", ru);

const DescriptionBlock = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  .block_title {
    font-size: 16px;
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
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

  .block_date {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
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

    &_title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 32px;
      color: ${colors.primary};
    }

    &__job {
      display: flex;
      justify-content: space-between;

      &_period {
        flex-shrink: 0;
        // width: 30%;
        width: 220px;
        margin-right: 48px;
      }

      &_description {
        // width: calc(70% - 48px);
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
    }

    .form_buttons {
      justify-content: flex-start;
    }
  }
`;

export const FormProfileTwo = ({ addJobExperience }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate, endDate]);

  const onSubmit = (formData) => addJobExperience(formData);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <FormStyled onSubmit={handleSubmit}>
            <div className="form">
              <h2 className="form_title">{words.stage2form.stepTwo}</h2>

              <div className="form__job">
                <div className="form__job_period">
                  <PeriodBlock>
                    <h2 className="block_title">
                      {words.stage2form.workStart}
                    </h2>

                    <Field
                      name="startDate"
                      render={({ input, meta, ...props }) => {
                        input.onChange(startDate);
                        return (
                          <div>
                            <DatePicker
                              {...props}
                              className="block_date"
                              locale="ru"
                              onChange={(dt) => setStartDate(dt)}
                              selected={startDate}
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                              showFullMonthYearPicker
                              maxDate={new Date()}
                            />
                          </div>
                        );
                      }}
                    />
                  </PeriodBlock>

                  <PeriodBlock>
                    <h2 className="block_title">{words.stage2form.workEnd}</h2>

                    <Field
                      name="endDate"
                      render={({ input, meta, ...props }) => {
                        input.onChange(endDate);
                        return (
                          <div>
                            <DatePicker
                              {...props}
                              className="block_date"
                              locale="ru"
                              onChange={(dt) => setEndDate(dt)}
                              selected={endDate}
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                              showFullMonthYearPicker
                              maxDate={new Date()}
                            />
                          </div>
                        );
                      }}
                    />
                  </PeriodBlock>
                </div>

                <div className="form__job_description">
                  <DescriptionBlock>
                    <h2 className="block_title">{words.stage2form.company}</h2>

                    <Field
                      name="company"
                      component={TextInput}
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
                      placeholder={words.stage2form.positionPh}
                    />
                  </DescriptionBlock>

                  <DescriptionBlock>
                    <h2 className="block_title">{words.stage2form.duty}</h2>

                    <Field
                      name="duty"
                      component={Textarea}
                      placeholder={words.stage2form.dutyPh}
                    />
                  </DescriptionBlock>
                </div>
              </div>
            </div>

            <div className="form_buttons">
              <Button title="Сохранить" width={256} icon={icons.success} />
            </div>
          </FormStyled>
        );
      }}
    />
  );
};
