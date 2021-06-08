import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ButtonGhost } from "../buttons/ButtonGhost";
import { Dropdown } from "./Dropdown";

import { icons } from "../../../utils/icons";
// import { colors } from "../../../utils/colors";

const ControlsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 32px;

  @media (min-width: 768px) {
    margin: 32px 0;
  }
`;

export const Controls = ({ isMobile, isOwner, removeProfile }) => {
  const history = useHistory();

  const deleteItems = [
    { title: "Да", icon: icons.delete, handler: removeProfile, danger: true },
    { title: "Отмена", icon: icons.back, handler: () => {} },
  ];

  return (
    <ControlsStyled>
      <div className="pad">
        <ButtonGhost
          title={isMobile ? "" : "Назад"}
          icon={icons.back}
          handler={() => history.goBack()}
        />
      </div>

      {isOwner && (
        <div className="pad">
          <Dropdown
            title={isMobile ? "Удалить мой профиль" : "Удалить мой профиль"}
            icon={icons.delete}
            items={deleteItems}
            danger
          />
        </div>
      )}
    </ControlsStyled>
  );
};
