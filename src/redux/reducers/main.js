import { batch } from "react-redux";
import { db, storage } from "../../utils/firebase";
import { imgUploader, getAvatar } from "../../utils/helpers";

import { setUser } from "./init";

const SET_PROGRESS = "main/SET_PROGRESS";
const SET_ISMOBILE = "main/SET_ISMOBILE";
const SET_SEARCHFORM = "main/SET_ISSEARCHFORM";
const SET_STAGEONE = "main/SET_STAGEONE";
const SET_STAGETWO = "main/SET_STAGETWO";

const SET_PROFILE = "main/SET_PROFILE";
const SET_LOAD_PROFILE = "main/SET_IS_PROFILE";
const SET_PROFLIST = "main/SET_PROFLIST";
const SET_LOAD_PROFLIST = "main/SET_IS_PROFLIST";

const initialState = {
  progress: null,
  isMobile: false,
  isSearchForm: false,
  isStage1Form: false,
  isStage2Form: false,
  loadProfile: false,
  profile: null,
  loadProfileList: false,
  profileList: [],
};

export const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return { ...state, progress: action.payload };

    case SET_ISMOBILE:
      return { ...state, isMobile: action.payload };

    case SET_SEARCHFORM:
      return { ...state, isSearchForm: action.payload };

    case SET_STAGEONE:
      return { ...state, isStage1Form: action.payload };

    case SET_STAGETWO:
      return { ...state, isStage2Form: action.payload };

    //

    case SET_LOAD_PROFILE:
      return { ...state, loadProfile: action.payload };

    case SET_PROFILE:
      return { ...state, profile: action.payload };

    case SET_LOAD_PROFLIST:
      return { ...state, loadProfileList: action.payload };

    case SET_PROFLIST:
      return { ...state, profileList: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setProgress = (payload) => ({ type: SET_PROGRESS, payload });
export const setMobile = (payload) => ({ type: SET_ISMOBILE, payload });
export const setSearchForm = (payload) => ({ type: SET_SEARCHFORM, payload });
export const setStage1Form = (payload) => ({ type: SET_STAGEONE, payload });
export const setStage2Form = (payload) => ({ type: SET_STAGETWO, payload });

const setLoadProfile = (payload) => ({ type: SET_LOAD_PROFILE, payload });
export const setProfile = (payload) => ({ type: SET_PROFILE, payload });
const setLoadProfileList = (payload) => ({ type: SET_LOAD_PROFLIST, payload });
const setProfileList = (payload) => ({ type: SET_PROFLIST, payload });

// THUNKS

export const getProfile = (profileID) => (dispatch) => {
  if (!profileID) return dispatch(setProfile(null));

  batch(() => {
    dispatch(setProgress(0));
    dispatch(setProfile(null));
    dispatch(setLoadProfile(true));
  });

  db.ref(`profiles/${profileID}`).once("value", (profile) => {
    dispatch(setProgress(40));
    const data = profile.val();

    const promise = storage
      .ref(data.avatarPath)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));

    Promise.resolve(promise)
      .then((res) => Promise.all(res))
      .then((urls) => {
        batch(() => {
          dispatch(setProgress(100));
          dispatch(setProfile({ ...data, avatarURL: urls[0] }));
          dispatch(setLoadProfile(false));
        });
      });
  });
};

export const getProfileList = () => (dispatch) => {
  batch(() => {
    dispatch(setProgress(0));
    dispatch(setLoadProfileList(true));
  });

  db.ref("profiles").once("value", async (profiles) => {
    dispatch(setProgress(40));

    const dbData = profiles.exists() ? Object.values(profiles.val()) : [];

    const urlPromise = await dbData.map(async (profile) => {
      const avatarURL = await getAvatar(profile.avatarPath);
      return { ...profile, avatarURL };
    });

    const fulfiled = await Promise.all(urlPromise);

    batch(() => {
      dispatch(setProfileList(fulfiled));
      dispatch(setLoadProfileList(false));
      dispatch(setProgress(100));
    });
  });
};

export const createProfile = (data, upl) => async (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
  });

  const userID = await getState().init.user.userID;

  const profileID = (await db.ref("profiles").push()).key;

  const newProfile = {
    ...data,
    avatarPath: `profiles/${userID}/avatar`,
    profileID,
    userID,
    stage: 1,
  };

  await Promise.all(
    upl.map((photo, num) => imgUploader(photo, num, userID, "avatar/"))
  )
    .then(() => dispatch(setProgress(40)))
    .catch((err) => console.log(err));

  const onUpdate = (err) => {
    if (err) return console.log(err);

    dispatch(setProgress(70));

    db.ref(`users/${userID}`)
      .update({ profileID })
      .then(() => {
        batch(() => {
          dispatch(setStage1Form(false));
          dispatch(setUser({ ...getState().init.user, profileID }));
          dispatch(getProfile(profileID));
          dispatch(getProfileList());
          dispatch(setProgress(100));
        });
      })
      .catch((err) => console.log(err));
  };

  db.ref(`profiles/${profileID}`).update(newProfile, onUpdate);
};

export const removeProfile = (profileID) => (dispatch, getState) => {
  const userID = getState().init.user.userID;
  const profile = getState().main.profile;

  batch(() => {
    dispatch(setProgress(0));
  });

  const onSet = async (err) => {
    if (err) return console.log(err);

    if (profile.avatarPath) {
      await storage
        .ref(profile.avatarPath)
        .listAll()
        .then((res) => res.items.forEach((item) => item.delete()))
        .then(() => dispatch(setProgress(30)))
        .catch((err) => console.log(err));
    }

    await db
      .ref(`users/${userID}`)
      .update({ profileID: null })
      .then(() => dispatch(setProgress(60)))
      .catch((err) => console.log(err));

    batch(() => {
      dispatch(setProgress(100));
      dispatch(setUser({ ...getState().init.user, profileID: null }));
      dispatch(setProfile(null));
      dispatch(getProfileList());
    });
  };

  db.ref().child(`profiles/${profileID}`).set(null, onSet);
};
