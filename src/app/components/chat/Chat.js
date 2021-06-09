// import { useEffect, useRef } from "react";
// import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import styled from "styled-components";

import { setIsChat, handleCurRoom } from "../../../redux/reducers/chat";

import { ButtonGhost } from "../buttons/ButtonGhost";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  align-items: center;
  height: 80px;
  padding: 0 32px;
  background-color: ${colors.bgWhiteOpaque};

  .chat_title {
    display: flex;
    align-items: center;
    user-select: none;

    &-text {
      font-size: 32px;
      font-weight: 900;
      color: ${colors.primary};
    }

    & > svg {
      width: 32px;
      height: 32px;
      margin-right: 8px;
      fill: ${colors.primary};
    }
  }
`;

const ChatContacts = styled.div`
  .contact {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0 24px;
    border-bottom: 2px solid ${colors.bgWhiteOpaque};
    transition: 0.08s linear;
    cursor: pointer;

    &_avatar {
      will-change: filter;
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      margin-right: 16px;
      border-radius: 50%;
      object-fit: cover;
      filter: drop-shadow(0 12px 16px ${colors.shadow});
    }

    &_username {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
    }

    &_close {
      flex-shrink: 0;
    }

    &:hover {
      background-color: ${colors.bgWhiteOpaque};
    }

    &:active {
      background-color: transparent;
    }
  }
`;

const ChatDialog = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.primary};
  transform: translateX(${({ isDialog }) => (isDialog ? "0" : "100%")});
  transition: 0.16s ease-out;
  overflow: hidden;

  .dialog_head {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0 24px;
    background-color: ${colors.bgWhiteOpaque};

    &-avatar {
      will-change: filter;
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      margin-right: 16px;
      border-radius: 50%;
      object-fit: cover;
      filter: drop-shadow(0 12px 16px ${colors.shadow});
    }

    &-username {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
    }

    &-close {
      flex-shrink: 0;
    }
  }
`;

const ChatStyled = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  min-width: 375px;
  height: 100vh;
  border-radius: 32px 0 0 32px;
  overflow: hidden;
  background-color: ${colors.bgShape};
  transform: translateX(${({ isChat }) => (isChat ? "0" : "100%")});
  transition: 0.16s ease-out;
  overflow: hidden;
  z-index: 200;

  .chatbody {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const ChatConatiner = ({
  isMobile,
  isChat,
  chatRooms,
  curRoom,
  curOpponent,
  setIsChat,
  handleCurRoom,
}) => {
  const rooms = Object.values(chatRooms);

  return (
    <ChatStyled isChat={isChat}>
      <ChatHeader>
        <div className="chat_title">
          {icons.chat}
          <h2 className="chat_title-text">{isMobile ? "" : "Диалоги"}</h2>
        </div>

        <ButtonGhost
          title="Свернуть"
          icon={icons.fold}
          handler={() => setIsChat(false)}
        />
      </ChatHeader>

      <div className="chatbody">
        {rooms.map((room) => (
          <ChatContacts key={room.roomID}>
            <div className="contact" onClick={() => handleCurRoom(room.roomID)}>
              <img
                className="contact_avatar"
                src={room.opponent.avatar}
                alt={room.opponent.userName}
              />

              <div className="contact_username">{room.opponent.userName}</div>
            </div>
          </ChatContacts>
        ))}

        <ChatDialog isDialog={!!curRoom}>
          {curOpponent && (
            <div className="dialog_head">
              <img
                className="dialog_head-avatar"
                src={curOpponent.avatar}
                alt={curOpponent.userName}
              />

              <div className="dialog_head-username">{curOpponent.userName}</div>

              <div className="dialog_head-close">
                <ButtonGhost
                  icon={icons.close}
                  iconsize={26}
                  handler={() => handleCurRoom(null)}
                />
              </div>
            </div>
          )}

          <div className="dialog_messages"></div>
          <div className="dialog_post"></div>
        </ChatDialog>
      </div>
    </ChatStyled>
  );
};

const mstp = (state) => ({
  isMobile: state.main.isMobile,
  isChat: state.chat.isChat,
  chatRooms: state.chat.chatRooms,
  curOpponent: state.chat.curOpponent,
  curRoom: state.chat.curRoom,
});

export const Chat = connect(mstp, { setIsChat, handleCurRoom })(ChatConatiner);
