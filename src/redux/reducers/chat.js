import { batch } from "react-redux";
import { db } from "../../utils/firebase";

const SET_IS_CHAT = "chat/SET_IS_CHAT";
const SET_CHAT_ROOMS = "chat/SET_CHAT_ROOMS";
const SET_CUR_ROOM = "chat/SET_CUR_ROOM";
const SET_CUR_ROOM_MSGS = "chat/SET_CUR_ROOMMSGS";

const initialState = {
  isChat: false,
  chatRooms: {},
  curRoom: null,
  curRoomMsgs: {},
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHAT:
      return { ...state, isChat: action.payload };

    case SET_CHAT_ROOMS:
      return { ...state, chatRooms: action.payload };

    case SET_CUR_ROOM:
      return { ...state, curRoom: action.payload };

    case SET_CUR_ROOM_MSGS:
      return { ...state, curRoomMsgs: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setIsChat = (payload) => ({ type: SET_IS_CHAT, payload });
const setChatRooms = (payload) => ({ type: SET_CHAT_ROOMS, payload });
const setCurRoom = (payload) => ({ type: SET_CUR_ROOM, payload });
const setCurRoomMsgs = (payload) => ({ type: SET_CUR_ROOM_MSGS, payload });

// THUNKS

export const resetNewMsgsNote = (roomID) => (dispatch, getState) => {
  const userID = getState().init.user.userID;

  // const onUpdate = (err) => console.log(err);

  db.ref(`chatrooms/${userID}/${roomID}`).update({ newMessages: 0 });
};

export const getChatRooms = () => (dispatch, getState) => {
  const userID = getState().init.user.userID;

  db.ref(`chatrooms/${userID}`).on("child_added", async (room) => {
    await db.ref(`users/${room.val().opponentID}`).once("value", (opponSn) => {
      if (opponSn.exists()) {
        const opponent = {
          username: opponSn.val().username,
          avatar: opponSn.val().avatar,
        };

        const chatRooms = getState().chat.chatRooms;
        const roomData = { ...room.val(), opponent };

        dispatch(setChatRooms({ ...chatRooms, [room.key]: roomData }));
      }
    });

    db.ref(`chatrooms/${userID}/${room.key}`).on("child_changed", (newMsgs) => {
      const chatRooms = getState().chat.chatRooms;
      const updRoom = { ...chatRooms[room.key], newMessages: newMsgs.val() };

      dispatch(setChatRooms({ ...chatRooms, [room.key]: updRoom }));
    });
  });
};

export const handleCurRoom = (roomID) => async (dispatch, getState) => {
  if (roomID) {
    await batch(() => {
      dispatch(resetNewMsgsNote(roomID));
      dispatch(setCurRoom(getState().chat.chatRooms[roomID]));
    });

    db.ref(`chatmsgs/${roomID}`).on("child_added", (msg) => {
      const roomMsgs = getState().chat.curRoomMsgs || {};

      batch(() => {
        dispatch(setCurRoomMsgs({ ...roomMsgs, [msg.key]: msg.val() }));
      });
    });
  }

  if (!roomID) {
    db.ref(`chatmsgs/${roomID}`).off();
    batch(() => {
      dispatch(setCurRoom(null));
      dispatch(setCurRoomMsgs({}));
    });
  }
};

export const goChat = () => async (dispatch, getState) => {
  const userID = getState().init.user.userID;
  const opponID = getState().main.profile.userID;

  const opponRmsSn = await db.ref(`chatrooms/${opponID}`).once("value");

  const userRooms = Object.keys(getState().chat.chatRooms);
  const opponRooms = Object.keys(opponRmsSn.exists() ? opponRmsSn.val() : {});

  const roomExists = userRooms.some((uRoomID) => opponRooms.includes(uRoomID));

  if (roomExists) {
    const roomID = userRooms
      .map((uRoomID) =>
        opponRooms.find((opponRoomID) => opponRoomID === uRoomID)
      )
      .find((roomID) => !!roomID);

    console.log(roomID);

    batch(() => {
      dispatch(setIsChat(true));
      dispatch(handleCurRoom(roomID));
    });
  }

  if (!roomExists) {
    const newRoomID = (await db.ref("chatmsgs").push()).key;

    const onUpdate = (err) => {
      if (err) console.log(err);

      batch(() => {
        dispatch(setIsChat(true));
        dispatch(handleCurRoom(newRoomID));
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

export const sendMessage = (message) => (dispatch, getState) => {
  const authorID = getState().init.user.userID;
  const roomID = getState().chat.curRoom.roomID;
  const opponID = getState().chat.curRoom.opponentID;

  const messageID = db.ref(`chatmsgs/${roomID}`).push().key;
  const newMsg = { messageID, authorID, ...message };

  const onUpdate = async (err) => {
    if (err) return console.log(err);

    const opponNewMsgs = await db
      .ref(`chatrooms/${opponID}/${roomID}/newMessages`)
      .once("value");

    db.ref(`chatrooms/${opponID}/${roomID}`).update({
      newMessages: +opponNewMsgs.val() + 1,
    });
  };

  db.ref(`chatmsgs/${roomID}/${messageID}`).update(newMsg, onUpdate);
};

export const resetChatState = () => (dispatch, getState) => {
  const userID = getState().init.user.userID;
  db.ref(`chatrooms/${userID}`).off();

  batch(() => {
    dispatch(setChatRooms({}));
    dispatch(setCurRoom(null));
    dispatch(setCurRoomMsgs({}));
    dispatch(setIsChat(false));
  });
};
