import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Resizer from "react-image-file-resizer";

import { ButtonOutline } from "../buttons/ButtonOutline";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const DropContainer = styled.div`
  height: ${({ multy }) => (multy ? "fit-content" : "100%")};

  .drop_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }
`;

const Display = styled.div`
  display: ${({ isOn }) => (isOn ? "block" : "none")};
  height: calc(100% - 32px);

  .photo {
    position: relative;
    width: 100%;
    height: ${({ multy }) => (multy ? "0" : "100%")};
    margin-bottom: ${({ multy }) => (multy ? "16px" : "0")};
    padding-top: ${({ multy }) => (multy ? "100%" : "0")};

    &_img {
      position: ${({ multy }) => (multy ? "absolute" : "relative")};
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      object-fit: cover;
    }

    &_delete {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
`;

const Drop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 32px);
  border-radius: 16px;
  border: 2px dashed ${colors.primary};
  transition: 0.08s linear;
  cursor: pointer;

  &:hover {
    border: 2px dashed ${colors.primaryHover};
  }

  &:active {
    border: 2px dashed ${colors.primary};
  }

  & > p {
    padding: 24px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    user-select: none;
  }
`;

export const Dropzone = ({
  isMobile = false,
  title = "",
  limit = 1,
  uploads = [],
  setUploads = () => {},
}) => {
  const resizeFile = (file) => {
    return new Promise((resolve) =>
      Resizer.imageFileResizer(
        file,
        1440,
        1440,
        "JPEG",
        60,
        0,
        (resized) => resolve(resized),
        "file"
      )
    );
  };

  const onDrop = useCallback(
    (photos) => {
      Promise.all(photos.map((photo) => resizeFile(photo)))
        .then((resPhotos) => setUploads([...uploads, ...resPhotos]))
        .catch((err) => console.log(err));
    },
    [uploads, setUploads]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: limit,
    accept: "image/jpeg, image/png",
  });

  const removePhoto = (index) => {
    setUploads(uploads.filter((_, item) => item !== index));
  };

  return (
    <DropContainer multy={limit > 1}>
      <h2 className="drop_title">{title}</h2>

      <Display isOn={uploads.length > 0} multy={limit > 1}>
        {uploads.map((ph, index) => (
          <div className="photo" key={index}>
            <img
              className="photo_img"
              src={typeof ph === "string" ? ph : URL.createObjectURL(ph)}
              alt=""
            />

            <div className="photo_delete">
              <ButtonOutline
                title={limit > 1 ? "Удалить" : "Изменить фото"}
                icon={limit > 1 ? icons.delete : icons.back}
                handler={() => removePhoto(index)}
              />
            </div>
          </div>
        ))}
      </Display>

      {uploads.length < limit && (
        <Drop {...getRootProps({ isDragActive })}>
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Отпускайте!</p>
          ) : (
            <p>Нажмите{!isMobile && " или переместите фото"} сюда</p>
          )}
        </Drop>
      )}
    </DropContainer>
  );
};
