import { db } from "../../utils/firebase";

const SET_ISMOBILE = "main/SET_ISMOBILE";
const SET_PROFILE = "main/SET_PROFILE";

const initialState = {
  isMobile: false,
  profile: null,
};

export const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISMOBILE:
      return { ...state, isMobile: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
export const setMobile = (payload) => ({ type: SET_ISMOBILE, payload });

// THUNKS

export const getProfile = (id) => (dispatch) => {
  db.ref(`users/${id}`).once("value", (profile) => {
    dispatch(setProfile(profile.val()));
  });
};
