import styled from "styled-components";

import { Button } from "../buttons/Button";

import { icons } from "../../../utils/icons";

const CtaStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ ison }) => (ison ? "28px" : "56px")};

  .buttons {
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin-bottom: ${({ ison }) => (ison ? "32px" : "64px")};
  }
`;

export const Cta = ({ isSearchForm, setSearchForm }) => {
  return (
    <CtaStyled ison={isSearchForm}>
      <Button
        icon={icons.search}
        title={isSearchForm ? "Скрыть поиск" : "Искать специалиста"}
        width={256}
        active={isSearchForm}
        handler={() => setSearchForm(!isSearchForm)}
      />

      <div className="search"></div>
    </CtaStyled>
  );
};
