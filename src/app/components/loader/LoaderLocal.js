import styled from "styled-components";

import loader from "../../../assets/icons/loader.svg";

import { colors } from "../../../utils/colors";

const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .loading_svg {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }

  .loading_text {
    font-size: 16px;
    font-weight: 600;
    color: ${colors.primary};
  }
`;

export const LoaderLocal = () => {
  return (
    <LoaderStyled>
      <img className="loading_svg" src={loader} alt="" />
      <div className="loading_text">Загрузка</div>
    </LoaderStyled>
  );
};
