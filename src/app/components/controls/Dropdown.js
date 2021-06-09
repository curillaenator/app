import styled, { keyframes } from "styled-components";
import Popup from "reactjs-popup";

import { ButtonGhost } from "../buttons/ButtonGhost";

import { colors } from "../../../utils/colors";

const popup_appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
  }

  &-content {
    animation: ${popup_appear} 0.16s ease-out;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 16px;
    border-radius: 16px;
    background-color: ${colors.bgWhite};
    filter: drop-shadow(0 10px 12px ${colors.shadow});
  }
`;

const StyledTrigger = styled.div``;

export const Dropdown = ({
  delID = null,
  title,
  icon,
  iconsize,
  items,
  danger,
}) => {
  return (
    <StyledPopup
      trigger={(open) => (
        <StyledTrigger>
          <ButtonGhost
            title={title}
            icon={icon}
            iconsize={iconsize}
            active={open}
            danger={danger}
            handler={() => {}}
          />
        </StyledTrigger>
      )}
      arrow={false}
      position="bottom right"
      closeOnDocumentClick
    >
      {(close) =>
        items.map((item) => (
          <ButtonGhost
            key={item.title}
            title={item.title}
            icon={item.icon}
            danger={item.danger}
            handler={() => {
              item.handler(delID);
              close();
            }}
          />
        ))
      }
    </StyledPopup>
  );
};
