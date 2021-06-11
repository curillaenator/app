import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import styled from "styled-components";

import { Dropzone } from "../dropzone/Dropzone";
import { TextInput } from "../inputs/Textinput";
import { Button } from "../buttons/Button";
import { ButtonGhost } from "../buttons/ButtonGhost";

import { colors } from "../../../utils/colors";
import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";

const EditorBlock = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  .meta_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

  .wrapper {
    .toolbar {
      margin-bottom: 0;
      padding: 16px;
      border-radius: 16px 16px 0 0;
      background-color: ${colors.bgLightGray};
    }

    .editor {
      padding: 16px;
      border-radius: 16px;
      background-color: ${colors.bgLightGray};
      font-weight: 700;
      font-size: 16px;
      color: ${colors.primary};
    }
  }
`;

const MetaBlock = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  .meta_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }
`;

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
  const createEditorState = () => {
    if (initValues.skillsHTML) {
      const contentBlock = htmlToDraft(initValues.skillsHTML);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }

    return EditorState.createEmpty();
  };

  const [uploads, setUploads] = useState([]);
  const [editorSt, setEditorSt] = useState({
    editorState: createEditorState(),
  });

  useEffect(() => {
    if (initValues.avatarURL) return setUploads([initValues.avatarURL]);
  }, [initValues.avatarURL]);

  const onSubmit = (formData) => {
    formData.skillsHTML = draftToHtml(
      convertToRaw(editorSt.editorState.getCurrentContent())
    );

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

              <div className="form_body">
                <FormTab>
                  <MetaBlock>
                    <h2 className="meta_title">{words.profForm.photo}</h2>

                    <Dropzone uploads={uploads} setUploads={setUploads} />
                  </MetaBlock>
                </FormTab>

                <FormTab>
                  <MetaBlock>
                    <h2 className="meta_title">{words.profForm.name}</h2>

                    <Field
                      name="name"
                      component={TextInput}
                      placeholder={words.profForm.namePh}
                    />
                  </MetaBlock>

                  <MetaBlock>
                    <h2 className="meta_title">{words.profForm.city}</h2>

                    <Field
                      name="city"
                      component={TextInput}
                      placeholder={words.profForm.cityPh}
                    />
                  </MetaBlock>

                  <MetaBlock>
                    <h2 className="meta_title">{words.profForm.job}</h2>

                    <Field
                      name="job"
                      component={TextInput}
                      placeholder={words.profForm.jobPh}
                    />
                  </MetaBlock>

                  <MetaBlock>
                    <h2 className="meta_title">{words.profForm.languages}</h2>

                    <Field
                      name="languages"
                      component={TextInput}
                      placeholder={words.profForm.languagesPh}
                    />
                  </MetaBlock>

                  <EditorBlock>
                    <h2 className="meta_title">{words.profForm.skills}</h2>

                    <Editor
                      toolbarHidden
                      editorState={editorSt.editorState}
                      toolbarClassName="toolbar"
                      wrapperClassName="wrapper"
                      editorClassName="editor"
                      onEditorStateChange={(editorState) =>
                        setEditorSt({ editorState })
                      }
                    />
                  </EditorBlock>
                </FormTab>
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
