import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { Dropzone } from "../dropzone/Dropzone";
import { Textarea } from "../inputs/Textarea";
import { Button } from "../buttons/Button";
import { ButtonGhost } from "../buttons/ButtonGhost";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";

const FormStyled = styled.form`
  margin-bottom: 56px;

  .form {
    margin-bottom: 32px;
    padding: 32px;
    border-radius: 24px;
    background-color: ${colors.bgShape};

    &_header {
      display: flex;
      aling-items: center;
      justify-content: space-between;

      &-title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 16px;
        color: ${colors.primary};
      }
    }

    .field {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .field_pad {
        width: 100%;
        margin-bottom: 32px;

        .block {
          margin-bottom: 32px;

          &:last-child {
            margin-bottom: 0;
          }

          &_title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
            color: ${colors.primary};
          }

          &_input {
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
          }
        }

        .photo {
          width: 100%;
          height: 100%;

          &_title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
            color: ${colors.primary};
          }
        }
      }
    }
  }

  .form_buttons {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .form {
      .field {
        .field_pad {
          width: calc(50% - 16px);
          margin-bottom: 0;
        }
      }
    }

    .form_buttons {
      justify-content: flex-start;
    }
  }
`;

export const FormProfileOne = ({
  initValues = {},
  edit = false,
  setForm = () => {},
  createProfile = () => {},
  editProfile = () => {},
}) => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (initValues.avatarURL) return setUploads([initValues.avatarURL]);
  }, [initValues.avatarURL]);

  const onSubmit = (formData) => {
    setForm();
    if (!edit) return createProfile(formData, uploads);
    if (edit) return editProfile(formData, uploads);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initValues}
      render={({ handleSubmit, form }) => {
        const close = (e) => {
          e.preventDefault();
          setForm();
        };

        return (
          <FormStyled onSubmit={handleSubmit}>
            <div className="form">
              <div className="form_header">
                {!edit && (
                  <h2 className="form_header-title">
                    {words.profForm.stepOne}
                  </h2>
                )}

                {edit && (
                  <h2 className="form_header-title">
                    {words.profForm.stepOneEdit}
                  </h2>
                )}

                {edit && (
                  <div className="form_header-close">
                    <ButtonGhost
                      icon={icons.close}
                      iconsize={32}
                      handler={close}
                    />
                  </div>
                )}
              </div>

              <div className="field">
                <div className="field_pad">
                  <div className="photo">
                    <h2 className="photo_title">{words.profForm.photo}</h2>

                    <Dropzone uploads={uploads} setUploads={setUploads} />
                  </div>
                </div>

                <div className="field_pad">
                  <div className="block">
                    <h2 className="block_title">{words.profForm.name}</h2>

                    <Field
                      name="name"
                      component="input"
                      className="block_input"
                      placeholder={words.profForm.namePh}
                    />
                  </div>

                  <div className="block">
                    <h2 className="block_title">{words.profForm.job}</h2>

                    <Field
                      name="job"
                      component="input"
                      className="block_input"
                      placeholder={words.profForm.jobPh}
                    />
                  </div>

                  <div className="block">
                    <h2 className="block_title">{words.profForm.skills}</h2>

                    <Field
                      name="skills"
                      component={Textarea}
                      className="block_input"
                      placeholder={words.profForm.skillsPh}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form_buttons">
              <Button
                title="Сохранить"
                width={256}
                icon={icons.success}
                // handler={submitHandler}
              />
            </div>
          </FormStyled>
        );
      }}
    />
  );
};
