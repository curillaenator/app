import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Popup from "reactjs-popup";

import { ButtonGhost } from "../buttons/ButtonGhost";

import { icons } from "../../../utils/icons";
// import { colors } from "../../../utils/colors";

const StyledPopup = styled(Popup)`
  &-overlay {
  }

  &-content {
    .menu {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;

const ControlsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;
`;

export const Controls = ({ signOut }) => {
  const history = useHistory();

  return (
    <ControlsStyled>
      <div className="pad">
        <ButtonGhost
          title="На главную"
          icon={icons.back}
          handler={() => history.push("/")}
        />
      </div>

      <div className="pad">
        <StyledPopup
          trigger={
            <div className="button">
              <ButtonGhost title="Управление" icon={icons.control} />
            </div>
          }
          arrow={false}
          position="bottom right"
          closeOnDocumentClick
        >
          <div className="menu">
            <ButtonGhost
              title="Выйти из аккаунта"
              icon={icons.logout}
              handler={signOut}
            />
            <ButtonGhost title="Удалить профиль" danger icon={icons.delete} />
          </div>
        </StyledPopup>
      </div>
    </ControlsStyled>
  );
};
