import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Resizer from "react-image-file-resizer";

import { ButtonOutline } from "../buttons/ButtonOutline";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const SinglePhoto = styled.div`
  position: relative;

  .photo_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

  .photo_img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: contain;
  }

  .photo_delete {
    position: absolute;
    top: 48px;
    right: 16px;
  }
`;

const DropzoneStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 35px);
  border-radius: 16px;
  border: 2px dashed ${colors.primary};
  transition: 0.08s linear;
  cursor: pointer;

  .photo_title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${colors.primary};
  }

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

  if (uploads.length === 1) {
    return (
      <SinglePhoto>
        <h2 className="photo_title">{title}</h2>

        <img
          className="photo_img"
          src={
            typeof uploads[0] === "string"
              ? uploads[0]
              : URL.createObjectURL(uploads[0])
          }
          alt=""
        />

        <div className="photo_delete">
          <ButtonOutline
            title="Изменить фото"
            icon={icons.back}
            handler={() => setUploads([])}
          />
        </div>
      </SinglePhoto>
    );
  }

  return (
    <DropzoneStyled {...getRootProps({ isDragActive })}>
      <h2 className="photo_title">{title}</h2>

      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Отпускайте!</p>
      ) : (
        <p>Нажмите или переместите фото сюда</p>
      )}
    </DropzoneStyled>
  );
};
