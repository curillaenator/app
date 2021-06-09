import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ButtonGhost } from "../buttons/ButtonGhost";
import { Dropdown } from "./Dropdown";

import { icons } from "../../../utils/icons";
import { colors } from "../../../utils/colors";

const ControlsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  margin-bottom: 32px;
  border-top: 2px solid ${colors.bgShape};

  @media (min-width: 768px) {
    margin: 32px 0;
  }
`;

export const Controls = ({
  isAuth,
  isMobile,
  isOwner,
  removeProfile,
  goChat,
}) => {
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
          iconsize={isMobile ? 26 : 18}
          handler={() => history.goBack()}
        />
      </div>

      <div className="pad">
        {isOwner && (
          <Dropdown
            title={isMobile ? "Удалить профиль" : "Удалить мой профиль"}
            icon={icons.delete}
            iconsize={isMobile ? 26 : 18}
            items={deleteItems}
            danger
          />
        )}

        {!isOwner && (
          <ButtonGhost
            title={isMobile ? "" : "Написать"}
            icon={icons.chat}
            iconsize={isMobile ? 26 : 18}
            disabled={!isAuth}
            handler={() => goChat()}
          />
        )}
      </div>
    </ControlsStyled>
  );
};
