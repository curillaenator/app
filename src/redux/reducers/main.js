import { db } from "../../utils/firebase";

const SET_ISMOBILE = "main/SET_ISMOBILE";
const SET_PROFILE = "main/SET_PROFILE";
const SET_USERLIST = "main/SET_USERLIST";

const initialState = {
  isMobile: false,
  profile: null,
  listLoading: false,
  userList: null,
};

export const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISMOBILE:
      return { ...state, isMobile: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    case SET_USERLIST:
      return { ...state, userList: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
export const setMobile = (payload) => ({ type: SET_ISMOBILE, payload });
const setUserList = (payload) => ({ type: SET_USERLIST, payload });

// THUNKS

export const getProfile = (id) => (dispatch) => {
  db.ref(`users/${id}`).once("value", (profile) => {
    dispatch(setProfile(profile.val()));
  });
};

export const getUserList = () => (dispatch) => {
  db.ref("users").once("value", (users) => {
    const usersData = users.exists() ? Object.values(users.val()) : [];
    console.log(usersData);
    dispatch(setUserList(usersData));
  });
};
