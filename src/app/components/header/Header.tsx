import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Popup from "reactjs-popup";

import { Avatar } from "../avatar/Avatar";
import { ButtonGhost } from "../buttons/ButtonGhost";

import { words } from "../../../utils/worder";
import { icons } from "../../../utils/icons";
import { colors } from "../../../utils/colors";
import { msgsQty } from "../../../utils/helpers";

import logo from "../../../assets/images/logo.png";

import { IHeader, IStyledPopup, IUserStyled } from "../../../types/types";

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

const StyledPopup = styled(Popup)<IStyledPopup>`
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

    .note_container {
      position: relative;

      &-notification {
        display: flex;
        justify-content: center;
        aling-items: center;
        position: absolute;
        top: 8px;
        left: 30px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${colors.fontDanger};
        color: transparent;
        opacity: ${({ note }) => (note ? "1" : "0")};
      }
    }
  }
`;

const UserStyled = styled.div<IUserStyled>`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.primary};
  transition: 0.08s ease-in-out;
  filter: drop-shadow(0 8px 8px ${colors.shadow});
  cursor: pointer;
  will-change: filter;

  .user_name {
    font-size: 18px;
    font-weight: 800;
    margin-right: 8px;
  }

  &:hover {
    transform: ${({ open }) => (open ? "scale(1)" : "scale(1.02)")};
    filter: drop-shadow(0 12px 12px ${colors.shadow});
  }

  &:active {
    transform: scale(1);
    filter: drop-shadow(0 8px 8px ${colors.shadow});
  }
`;

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.08s ease-in-out;
  cursor: pointer;
  filter: drop-shadow(0 8px 8px ${colors.shadow});
  will-change: filter;

  .image {
    width: 56px;
    height: 56px;
    margin-right: 16px;
    object-fit: cover;
  }

  .text {
    font-weight: 900;
    font-size: 32px;
    color: ${colors.primary};
  }

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 12px 12px ${colors.shadow});
  }

  &:active {
    transform: scale(1);
    filter: drop-shadow(0 8px 8px ${colors.shadow});
  }
`;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;

  .buttons {
    display: flex;
    align-items: center;

    &_btn {
      margin-left: 16px;
    }
  }

  @media (min-width: 768px) {
    margin-top: 24px;
  }

  @media (min-width: 1024px) {
    margin-top: 44px;
  }
`;

export const Header: FC<IHeader> = ({
  isMobile,
  user,
  chatRooms,
  signIn,
  signOut,
  setProfileList,
  setIsChat,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <HeaderStyled>
      <LogoStyled
        onClick={() => {
          history.push("/");
          setProfileList([]);
        }}
      >
        <img className="image" src={logo} alt="Logo" />
        <div className="text">{words.logoTitle}</div>
      </LogoStyled>

      {!user.userID && (
        <div className="buttons">
          <ButtonGhost title="????????" handler={signIn} fontsize={16} />
        </div>
      )}

      {user.userID && (
        <div className="buttons">
          <StyledPopup
            trigger={(open) => (
              <UserStyled open={open}>
                {!isMobile && <p className="user_name">{user.username}</p>}

                <Avatar
                  imgSrc={user.avatar}
                  username={user.username}
                  notesNum={msgsQty(chatRooms)}
                />
              </UserStyled>
            )}
            arrow={false}
            position="bottom right"
            closeOnDocumentClick
            note={msgsQty(chatRooms) > 0}
          >
            {(close: () => void) => (
              <>
                {location.pathname !== "/profile" && (
                  <ButtonGhost
                    title="?????? ??????????????"
                    icon={icons.profile}
                    handler={() => {
                      history.push("/profile");
                      close();
                    }}
                  />
                )}

                <div className="note_container">
                  <ButtonGhost
                    title="?????? ??????????????"
                    icon={icons.chat}
                    handler={() => {
                      setIsChat(true);
                      close();
                    }}
                  />

                  <div className="note_container-notification">*</div>
                </div>

                <ButtonGhost
                  title="??????????????????"
                  icon={icons.star}
                  handler={() => {
                    history.push("/starred");
                    close();
                  }}
                />

                <ButtonGhost
                  title="??????????"
                  icon={icons.logout}
                  handler={() => {
                    signOut();
                    close();
                  }}
                />
              </>
            )}
          </StyledPopup>
        </div>
      )}
    </HeaderStyled>
  );
};
