import { batch } from "react-redux";
import { fb, auth, db } from "../../utils/firebase";

const SET_IS_INIT = "init/SET_IS_INIT";
const SET_IS_AUTH = "init/SET_IS_AUTH";
const SET_USER = "init/SET_USER";

const initialState = {
  isInit: false,
  isAuth: false,
  user: null,
};

export const init = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_INIT:
      return { ...state, isInit: action.payload };

    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload };

    case SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

// ACTIONS

const setInit = (payload) => ({ type: SET_IS_INIT, payload });
const setAuth = (payload) => ({ type: SET_IS_AUTH, payload });
const setUser = (payload) => ({ type: SET_USER, payload });

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
  auth.signOut().then(() => {
    batch(() => {
      dispatch(setAuth(false));
      dispatch(setUser({ userID: null }));
    });
  });
};

export const signCheck = () => (dispatch) => {
  const setState = (user, isAuth, isInit) => {
    batch(() => {
      dispatch(setUser(user));
      dispatch(setAuth(isAuth));
      dispatch(setInit(isInit));
    });
  };

  auth.onAuthStateChanged((user) => {
    // console.log(user);

    if (!user) setState({ userID: null, isAdmin: false }, false, true);

    if (user) {
      db.ref(`users/${user.uid}`).on("value", (userData) => {
        if (userData.exists()) {
          setState(userData.val(), true, true);
          db.ref(`users/${user.uid}`).off();
        }
      });
    }
  });
};
