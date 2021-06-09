import { batch } from "react-redux";
import { db } from "../../utils/firebase";

const SET_IS_CHAT = "chat/SET_IS_CHAT";
const SET_CHAT_ROOMS = "chat/SET_CHAT_ROOMS";
const SET_CUR_OPPON = "chat/SET_CUR_OPPON";
const SET_CUR_ROOM = "chat/SET_CUR_ROOM";

const initialState = {
  isChat: false,
  chatRooms: {},
  curRoom: null,
  curOpponent: null,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHAT:
      return { ...state, isChat: action.payload };

    case SET_CHAT_ROOMS:
      return { ...state, chatRooms: action.payload };

    case SET_CUR_OPPON:
      return { ...state, curOpponent: action.payload };

    case SET_CUR_ROOM:
      return { ...state, curRoom: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setIsChat = (payload) => ({ type: SET_IS_CHAT, payload });
const setChatRooms = (payload) => ({ type: SET_CHAT_ROOMS, payload });
const setCurOppon = (payload) => ({ type: SET_CUR_OPPON, payload });
const setCurRoom = (payload) => ({ type: SET_CUR_ROOM, payload });

// THUNKS

export const getChatRooms = () => (dispatch, getState) => {
  const userID = getState().init.user.userID;

  db.ref(`chatrooms/${userID}`).on("child_added", (room) => {
    db.ref(`users/${room.val().opponentID}`).once("value", (opponSn) => {
      const opponent = {
        userName: opponSn.val().username,
        avatar: opponSn.val().avatar,
      };

      const chatRooms = getState().chat.chatRooms;
      const roomData = { ...room.val(), opponent };

      dispatch(setChatRooms({ ...chatRooms, [room.key]: roomData }));
    });
  });

  //   db.ref(`chatrooms/${userID}`).on("child_changed", (room) => {
  //     const chatRooms = getState().chat.chatRooms;
  //     dispatch(setChatRooms({ ...chatRooms, [room.key]: room.val() }));
  //   });
};

export const goChat = () => async (dispatch, getState) => {
  const userID = getState().init.user.userID;
  const opponID = getState().main.profile.userID;

  const opponRmsSn = await db.ref(`chatrooms/${opponID}`).once("value");

  const userRooms = Object.keys(getState().chat.chatRooms);
  const opponRooms = Object.keys(opponRmsSn.exists() ? opponRmsSn.val() : {});

  const roomExists = userRooms.some((uRoomID) => opponRooms.includes(uRoomID));

  if (roomExists) {
    batch(() => {
      dispatch(setIsChat(true));
    });
  }

  if (!roomExists) {
    const newRoomID = (await db.ref("chatmsgs").push()).key;

    const onUpdate = (err) => {
      if (err) console.log(err);

      batch(() => {
        dispatch(setIsChat(true));
      });
    };

    const updates = {};
    updates[`chatrooms/${userID}/${newRoomID}`] = {
      roomID: newRoomID,
      newMessages: 0,
      opponentID: opponID,
    };
    updates[`chatrooms/${opponID}/${newRoomID}`] = {
      roomID: newRoomID,
      newMessages: 0,
      opponentID: userID,
    };

    db.ref().update(updates, onUpdate);
  }
};

export const handleCurRoom = (roomID) => async (dispatch, getState) => {
  if (roomID) {
    const opponent = getState().chat.chatRooms[roomID].opponent;

    await batch(() => {
      dispatch(setCurRoom({}));
      dispatch(setCurOppon(opponent));
    });

    db.ref(`chatmsgs/${roomID}`).on("child_added", (msg) => {
      const roomMsgs = getState().chat.curRoom || {};

      batch(() => {
        dispatch(setCurRoom({ ...roomMsgs, [msg.key]: msg.val() }));
      });
    });
  }

  if (!roomID) {
    db.ref(`chatmsgs/${roomID}`).off();
    batch(() => {
      dispatch(setCurRoom(null));
      dispatch(setCurOppon(null));
    });
  }
};
