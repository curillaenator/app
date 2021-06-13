import { Form, Field } from "react-final-form";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
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

import { formOneEditorState } from "../../../utils/helpers";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";

const FormTab = styled.div`
  width: 100%;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    width: calc(50% - 16px);
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
  initValues = {},
  edit = false,
  setForm = () => {},
  createProfile = () => {},
  editProfile = () => {},
}) => {
  const initialValues = {
    ...initValues,
    uploads: initValues.avatarURL ? [initValues.avatarURL] : [],
    editorState: formOneEditorState(initValues.skillsHTML),
  };

  const onSubmit = (formData) => {
    formData.skillsHTML = draftToHtml(
      convertToRaw(formData.editorState.getCurrentContent())
    );

    delete formData.editorState;
    delete formData.avatarURL;

    setForm();
    if (!edit) return createProfile(formData);
    if (edit) return editProfile(formData);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, values, form }) => {
        //
        const setUploads = (uploads) => form.change("uploads", uploads);
        const setEdState = (edState) => form.change("editorState", edState);

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
                <FormTab>
                  <Dropzone
                    title={words.profForm.photo}
                    uploads={values.uploads}
                    setUploads={setUploads}
                  />
                </FormTab>

                <FormTab>
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
                    edState={values.editorState}
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
