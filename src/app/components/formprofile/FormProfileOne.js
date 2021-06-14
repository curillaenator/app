import { useState } from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { Dropzone } from "../dropzone/Dropzone";
import { TitledTextinput } from "../inputs/TitledTextinput";
import { TitledEditor } from "../inputs/TitledEditor";
import { Button } from "../buttons/Button";
import { ButtonGhost } from "../buttons/ButtonGhost";

import {
  required,
  minTextLength,
  composeValidators,
} from "../../../utils/validators";

import { newEditorState, convertEdStateToHtml } from "../../../utils/helpers";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";

const FormTab = styled.div`
  width: 100%;
  margin-bottom: 32px;

  @media (min-width: 1024px) {
    width: calc(${({ width }) => width} - 16px);
    margin-bottom: 0;
  }
`;

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
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 16px;
        color: ${colors.primary};
      }
    }

    &_body {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  .form_buttons {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .form_buttons {
      justify-content: flex-start;
    }
  }
`;

export const FormProfileOne = ({
  isMobile,
  initValues = {},
  edit = false,
  setForm = () => {},
  createProfile = () => {},
  editProfile = () => {},
}) => {
  const [edState, setEdState] = useState(newEditorState(initValues.skillsHTML));
  const [uploads, setUploads] = useState(
    initValues.avatarURL ? [initValues.avatarURL] : []
  );

  const onSubmit = (formData) => {
    formData.skillsHTML = convertEdStateToHtml(edState);
    formData.uploads = uploads;

    delete formData.avatarURL;

    setForm();
    if (!edit) return createProfile(formData);
    if (edit) return editProfile(formData);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initValues}
      render={({ handleSubmit, submitting, values, form }) => {
        //
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

              <div className="form_body">
                <FormTab width="30%">
                  <Dropzone
                    isMobile={isMobile}
                    title={words.profForm.photo}
                    uploads={uploads}
                    setUploads={setUploads}
                  />
                </FormTab>

                <FormTab width="70%">
                  <Field
                    name="name"
                    title={words.profForm.name}
                    placeholder={words.profForm.namePh}
                    component={TitledTextinput}
                    validate={composeValidators(required, minTextLength(3))}
                  />

                  <Field
                    name="city"
                    title={words.profForm.city}
                    placeholder={words.profForm.cityPh}
                    component={TitledTextinput}
                    validate={composeValidators(required, minTextLength(3))}
                  />

                  <Field
                    name="job"
                    title={words.profForm.job}
                    placeholder={words.profForm.jobPh}
                    component={TitledTextinput}
                    validate={composeValidators(required, minTextLength(3))}
                  />

                  <Field
                    name="languages"
                    title={words.profForm.languages}
                    placeholder={words.profForm.languagesPh}
                    component={TitledTextinput}
                  />

                  <TitledEditor
                    title={words.profForm.skills}
                    toolbarHidden
                    edState={edState}
                    setEdState={setEdState}
                  />
                </FormTab>
              </div>
            </div>

            <div className="form_buttons">
              <Button
                title="Сохранить"
                width={256}
                icon={icons.success}
                disabled={submitting}
              />
            </div>
          </FormStyled>
        );
      }}
    />
  );
};
