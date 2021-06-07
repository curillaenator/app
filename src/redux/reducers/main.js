import { batch } from "react-redux";
import { db } from "../../utils/firebase";
import { imgUploader, getAvatar } from "../../utils/helpers";

import { setUser } from "./init";

const SET_ISMOBILE = "main/SET_ISMOBILE";
const SET_PROFILE = "main/SET_PROFILE";
const SET_PROFLIST = "main/SET_PROFLIST";
const SET_SEARCHFORM = "main/SET_ISSEARCHFORM";
const SET_PROFFORM = "main/SET_PROFFORM";

const initialState = {
  isMobile: false,
  isSearchForm: false,
  isProfileForm: false,
  profile: null,
  profileList: [],
};

export const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISMOBILE:
      return { ...state, isMobile: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    case SET_PROFLIST:
      return { ...state, profileList: action.payload };

    case SET_SEARCHFORM:
      return { ...state, isSearchForm: action.payload };

    case SET_PROFFORM:
      return { ...state, isProfileForm: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setMobile = (payload) => ({ type: SET_ISMOBILE, payload });
export const setSearchForm = (payload) => ({ type: SET_SEARCHFORM, payload });
export const setProfileForm = (payload) => ({ type: SET_PROFFORM, payload });

export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
const setProfileList = (payload) => ({ type: SET_PROFLIST, payload });

// THUNKS

export const getProfile = (id) => (dispatch) => {
  db.ref(`profiles/${id}`).once("value", (profile) => {
    dispatch(setProfile(profile.val()));
  });
};

export const getProfileList = () => (dispatch) => {
  db.ref("profiles").once("value", async (profiles) => {
    const dbData = profiles.exists() ? Object.values(profiles.val()) : [];

    const urlPromise = await dbData.map(async (profile) => {
      const avatarURL = await getAvatar(profile.avatarPath);
      return { ...profile, avatarURL };
    });

    const fulfiled = await Promise.all(urlPromise);

    dispatch(setProfileList(fulfiled));
  });
};

export const createNewProfile = (data, upl) => async (dispatch, getState) => {
  const userID = await getState().init.user.userID;

  const key = (await db.ref("profiles").push()).key;

  const newProfile = {
    ...data,
    avatarPath: `profiles/${userID}/avatar`,
    profileID: key,
    userID: userID,
  };

  await Promise.all(
    upl.map((photo, num) => imgUploader(photo, num, userID, "avatar/"))
  ).catch((err) => console.log(err));

  const onUpdate = (err) => {
    if (err) return console.log(err);

    db.ref(`users/${userID}`)
      .update({ profileID: key })
      .then((res) => {
        console.log(res);

        batch(() => {
          dispatch(setProfileForm(false));
          dispatch(setUser({ ...getState().init.user, profileID: key }));
          dispatch(getProfileList());
        });
      })
      .catch((err) => console.log(err));
  };

  db.ref(`profiles/${key}`).update(newProfile, onUpdate);
};
