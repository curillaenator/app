import { useEffect, useRef } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { Scrollbars } from "rc-scrollbars";
import styled from "styled-components";

import {
  setIsChat,
  handleCurRoom,
  sendMessage,
  resetNewMsgsNote,
} from "../../../redux/reducers/chat";

import { Avatar } from "../avatar/Avatar";
import { ButtonGhost } from "../buttons/ButtonGhost";
import { ButtonSend } from "../buttons/ButtonSend";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  align-items: center;
  height: 80px;
  padding: 0 32px;
  background-color: ${colors.bgMediumGray};

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

const ChatContacts = styled(Scrollbars)`
  .contact {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0 24px;
    transition: 0.08s linear;
    cursor: pointer;

    &_username {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
    }

    &_close {
      flex-shrink: 0;
    }

    &:hover {
      background-color: ${colors.bgMediumGray};
    }

    &:active {
      background-color: transparent;
    }
  }
`;

const ChatDialogMessage = styled.div`
  display: flex;
  // justify-content: center;
  flex-shrink: 0;
  align-items: center;
  align-self: ${({ author }) => (author ? "flex-end" : "flex-start")};
  width: fit-content;
  max-width: 80%;
  min-height: 56px;
  margin: 8px 0;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ author }) =>
    author ? colors.primaryHover : colors.bgLightGray};
  font-weight: 600;
  color: ${({ author }) => (author ? colors.fontWhite : colors.fontBlack)};
  line-height: 1.4;
  text-align: ${({ author }) => (author ? "end" : "start")};
`;

const ChatDialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.primary};
  transform: translateX(${({ isDialog }) => (isDialog ? "0" : "100%")});
  transition: 0.16s ease-out;
  overflow: hidden;
  z-index: 10;

  .dialog_head {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0 24px;
    background-color: ${colors.bgMediumGray};

    &-username {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
    }

    &-close {
      flex-shrink: 0;
    }
  }

  .dialog_messages {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
  }

  .dialog_post {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 120px;
    padding: 0 24px;
    background-color: ${colors.bgShape};

    &-input {
      width: 100%;
      height: 56px;
      padding: 16px;
      border-radius: 16px 0 0 16px;
      background-color: ${colors.bgLightGray};
      outline: none;
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
  userID,
  isMobile,
  isChat,
  chatRooms,
  curRoom,
  curRoomMsgs,
  setIsChat,
  handleCurRoom,
  sendMessage,
  resetNewMsgsNote,
}) => {
  const messagesRef = useRef(null);

  useEffect(() => {
    !!curRoom && messagesRef.current.scrollToBottom();
  }, [curRoom, curRoomMsgs]);

  const rooms = Object.values(chatRooms);
  const roomMsgs = Object.values(curRoomMsgs);
  const dialogNewMsgs = !!curRoom ? chatRooms[curRoom.roomID].newMessages : 0;

  const onSubmit = (messageData) => sendMessage(messageData);

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
        <ChatContacts autoHide>
          {rooms.map((room) => (
            <div
              className="contact"
              onClick={() => handleCurRoom(room.roomID)}
              key={room.roomID}
            >
              <Avatar
                imgSrc={room.opponent.avatar}
                username={room.opponent.username}
                notesNum={room.newMessages}
                margin="0 16px 0 0"
                shadow
              />

              <div className="contact_username">{room.opponent.username}</div>
            </div>
          ))}
        </ChatContacts>

        <ChatDialog
          isDialog={!!curRoom}
          onClick={() => resetNewMsgsNote(curRoom.roomID)}
        >
          {!!curRoom && (
            <>
              <div className="dialog_head">
                <Avatar
                  imgSrc={curRoom.opponent.avatar}
                  username={curRoom.opponent.userName}
                  notesNum={dialogNewMsgs}
                  margin="0 16px 0 0"
                  shadow
                />

                <div className="dialog_head-username">
                  {curRoom.opponent.username}
                </div>

                <div className="dialog_head-close">
                  <ButtonGhost
                    icon={icons.close}
                    iconsize={26}
                    handler={() => handleCurRoom(null)}
                  />
                </div>
              </div>

              <Scrollbars
                ref={messagesRef}
                autoHide
                classes={{ view: "dialog_messages" }}
              >
                {roomMsgs.map((message) => (
                  <ChatDialogMessage
                    key={message.messageID}
                    author={userID === message.authorID}
                  >
                    {message.message}
                  </ChatDialogMessage>
                ))}
              </Scrollbars>

              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form }) => {
                  const sendMessage = (e) => {
                    e.preventDefault();
                    form.submit();
                    form.reset();
                  };

                  return (
                    <form className="dialog_post" onSubmit={handleSubmit}>
                      <Field
                        name="message"
                        component="input"
                        className="dialog_post-input"
                        placeholder="Напишите сообшение"
                      />

                      <ButtonSend
                        icon={icons.send}
                        iconsize={24}
                        handler={sendMessage}
                      />
                    </form>
                  );
                }}
              />
            </>
          )}
        </ChatDialog>
      </div>
    </ChatStyled>
  );
};

const mstp = (state) => ({
  userID: state.init.user.userID,
  isMobile: state.main.isMobile,
  isChat: state.chat.isChat,
  chatRooms: state.chat.chatRooms,
  curRoom: state.chat.curRoom,
  curRoomMsgs: state.chat.curRoomMsgs,
});

export const Chat = connect(mstp, {
  setIsChat,
  handleCurRoom,
  sendMessage,
  resetNewMsgsNote,
})(ChatConatiner);
