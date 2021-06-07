import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Resizer from "react-image-file-resizer";

import { colors } from "../../../utils/colors";

const SinglePhoto = styled.div`
  .photo_img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: contain;
  }
`;

const DropzoneStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 35px);
  //   height: 100%;
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

export const Dropzone = ({ uploads, setUploads, limit = 1 }) => {
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
        <img
          className="photo_img"
          src={
            typeof uploads[0] === "string"
              ? uploads[0]
              : URL.createObjectURL(uploads[0])
          }
          alt=""
        />
      </SinglePhoto>
    );
  }

  return (
    <DropzoneStyled {...getRootProps({ isDragActive })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпускайте!</p>
      ) : (
        <p>Нажмите или переместите фото сюда</p>
      )}
    </DropzoneStyled>
  );
};
