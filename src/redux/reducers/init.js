import { batch } from "react-redux";
import { fb, auth, db } from "../../utils/firebase";

import { resetChatState } from "./chat";
import { setProgress } from "./main";

const SET_IS_INIT = "init/SET_IS_INIT";
const SET_USER = "init/SET_USER";
const SET_STARRED = "main/SET_STARRED";

const initialState = {
  isInit: false,
  user: null,
};

export const init = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_INIT:
      return { ...state, isInit: action.payload };

    case SET_USER:
      return { ...state, user: action.payload };

    case SET_STARRED:
      return { ...state, user: { ...state.user, starred: action.payload } };

    default:
      return state;
  }
};

// ACTIONS

const setInit = (payload) => ({ type: SET_IS_INIT, payload });
export const setUser = (payload) => ({ type: SET_USER, payload });
export const setStarred = (payload) => ({ type: SET_STARRED, payload });

// THUNKS

export const signIn = () => async (dispatch) => {
  const provider = new fb.auth.GoogleAuthProvider();
  const user = await auth
    .signInWithPopup(provider)
    .then((res) => res.user)
    .catch((err) => console.log(err));

  db.ref(`users/${user.uid}`).once("value", (userData) => {
    if (!userData.exists()) {
      const newUser = {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        userID: user.uid,
        isAdmin: false,
      };

      db.ref(`users/${user.uid}`)
        .set(newUser)
        .catch((err) => console.log(err));
    }
  });
};

export const signOut = () => (dispatch) => {
  dispatch(setProgress(0));

  auth.signOut().then(() => {
    batch(() => {
      dispatch(setUser({ userID: null, isAdmin: false }));
      dispatch(resetChatState());
      dispatch(setProgress(100));
    });
  });
};

export const signCheck = () => (dispatch) => {
  const setState = (user, isInit) => {
    batch(() => {
      dispatch(setUser(user));
      dispatch(setInit(isInit));
    });
  };

  auth.onAuthStateChanged((user) => {
    if (!user) setState({ userID: null, isAdmin: false }, true);

    if (user) {
      db.ref(`users/${user.uid}`).on("value", (userData) => {
        if (userData.exists()) {
          setState(userData.val(), true);
          db.ref(`users/${user.uid}`).off();
        }
      });
    }
  });
};
