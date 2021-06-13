import { Editor } from "react-draft-wysiwyg";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

const EditorStyled = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  .editor_title {
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

export const TitledEditor = ({ title, toolbarHidden, edState, setEdState }) => {
  return (
    <EditorStyled>
      <h2 className="editor_title">{title}</h2>

      <Editor
        toolbarClassName="toolbar"
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarHidden={toolbarHidden}
        editorState={edState}
        onEditorStateChange={setEdState}
      />
    </EditorStyled>
  );
};
