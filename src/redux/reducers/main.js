import { batch } from "react-redux";
import { db, storage } from "../../utils/firebase";

import { imgUploader, getAvatar, totalPeriodCalc } from "../../utils/helpers";

import { setUser, setStarred } from "./init";

const SET_PROGRESS = "main/SET_PROGRESS";
const SET_ISMOBILE = "main/SET_ISMOBILE";
const SET_SEARCHFORM = "main/SET_ISSEARCHFORM";
const SET_STAGEONE = "main/SET_STAGEONE";
const SET_STAGETWO = "main/SET_STAGETWO";

const SET_PROFILE = "main/SET_PROFILE";
const SET_LOAD_PROFILE = "main/SET_IS_PROFILE";
const SET_PROFLIST = "main/SET_PROFLIST";
const SET_LOAD_PROFLIST = "main/SET_IS_PROFLIST";
const SET_STARLIST = "main/SET_STARLIST";
const SET_LOAD_STARLIST = "main/SET_LOAD_STARLIST";

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
  loadStarredList: false,
  starredList: [],
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

    case SET_LOAD_STARLIST:
      return { ...state, loadStarredList: action.payload };

    case SET_STARLIST:
      return { ...state, starredList: action.payload };

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
export const setProfileList = (payload) => ({ type: SET_PROFLIST, payload });
const setLoadStarredList = (payload) => ({ type: SET_LOAD_STARLIST, payload });
const setStarredList = (payload) => ({ type: SET_STARLIST, payload });

// THUNKS

export const getProfileList = () => (dispatch) => {
  batch(() => {
    dispatch(setProgress(0));
    dispatch(setLoadProfileList(true));
  });

  db.ref("profiles").once("value", async (profiles) => {
    dispatch(setProgress(40));

    const dbData = profiles.exists() ? Object.values(profiles.val()) : [];

    const profilesPromises = await dbData.map(async (profile) => {
      const avatarURL = await getAvatar(profile.avatarPath);

      const jobExpTotal = totalPeriodCalc(profile.jobExp);

      return { ...profile, avatarURL, jobExpTotal };
    });

    const profilesFulfiled = await Promise.all(profilesPromises);

    batch(() => {
      dispatch(setProfileList(profilesFulfiled.reverse()));
      dispatch(setLoadProfileList(false));
      dispatch(setProgress(100));
    });
  });
};

// handleprofile

export const getProfile = (profileID) => (dispatch, getState) => {
  if (!profileID) return dispatch(setProfile(null));

  batch(() => {
    dispatch(setProgress(0));
    dispatch(setProfile(null));
    dispatch(setLoadProfile(true));
  });

  const profileIsLoaded = getState().main.profileList.find(
    (profile) => profile.profileID === profileID
  );

  if (profileIsLoaded) {
    const jobExpTotal = totalPeriodCalc(profileIsLoaded.jobExp);

    return batch(() => {
      dispatch(setProgress(100));
      dispatch(setProfile({ ...profileIsLoaded, jobExpTotal }));
      dispatch(setLoadProfile(false));
    });
  }

  db.ref(`profiles/${profileID}`).once("value", (profile) => {
    dispatch(setProgress(40));
    const data = profile.val();

    const jobExpTotal = totalPeriodCalc(data.jobExp);

    const promise = storage
      .ref(data.avatarPath)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));

    Promise.resolve(promise)
      .then((res) => Promise.all(res))
      .then((urls) => {
        batch(() => {
          dispatch(setProgress(100));
          dispatch(setProfile({ ...data, avatarURL: urls[0], jobExpTotal }));
          dispatch(setLoadProfile(false));
        });
      });
  });
};

export const createProfile = (data) => async (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
  });

  const userID = await getState().init.user.userID;
  const profileID = (await db.ref("profiles").push()).key;
  const uploads = [...data.uploads];

  delete data.uploads;

  const newProfile = {
    ...data,
    avatarPath: `profiles/${userID}/avatar`,
    profileID,
    userID,
    stage: 1,
  };

  await Promise.all(
    uploads.map((photo, num) => imgUploader(photo, num, userID, "avatar/"))
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

export const editProfile = (data) => async (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
    dispatch(setLoadProfile(true));
  });

  const userID = getState().init.user.userID;
  const profileID = getState().init.user.profileID;
  const uploads = [...data.uploads];

  delete data.uploads;

  if (typeof uploads[0] !== "string") {
    await Promise.all(
      uploads.map((photo, num) => imgUploader(photo, num, userID, "avatar/"))
    )
      .then(() => dispatch(setProgress(70)))
      .catch((err) => console.log(err));
  }

  const onUpdate = (err) => {
    if (err) return console.log(err);

    batch(() => {
      dispatch(setProgress(100));
      dispatch(getProfile(profileID));
    });
  };

  db.ref(`profiles/${profileID}`).update(data, onUpdate);
};

export const removeProfile = (profileID) => (dispatch, getState) => {
  const userID = getState().init.user.userID;
  const profile = getState().main.profile;
  // const chatRooms = getState().chat.chatRooms;
  // const chatRoomIDs = Object.keys(chatRooms);

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
        .then(() => dispatch(setProgress(20)))
        .catch((err) => console.log(err));
    }

    // if (chatRoomIDs.length > 0) {
    //   const allMessagesOfProfileRooms = chatRoomIDs.map((roomID) => [
    //     `chatmsgs/${roomID}`,
    //     null,
    //   ]);

    //   const allRoomOfUser = chatRoomIDs.map((roomID) => [
    //     `chatrooms/${userID}/${roomID}`,
    //     null,
    //   ]);

    //   const allUserRoomsInOpponent = chatRoomIDs.map((roomID) => {
    //     const opponentID = chatRooms[roomID].opponentID;
    //     return [`chatrooms/${opponentID}/${roomID}`, null];
    //   });

    //   const userChatsRemove = {
    //     ...Object.fromEntries(allMessagesOfProfileRooms),
    //     ...Object.fromEntries(allRoomOfUser),
    //     ...Object.fromEntries(allUserRoomsInOpponent),
    //   };

    //   await db
    //     .ref()
    //     .update(userChatsRemove)
    //     .then(() => {
    //       batch(() => {
    //         dispatch(setProgress(40));
    //         dispatch(resetChatState());
    //       });
    //     })
    //     .catch((err) => console.log(err));
    // }

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

// handle job experience

export const addJobExperience = (data) => async (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
  });

  const profile = getState().main.profile;
  const profID = getState().init.user.profileID;
  const jobID = await db.ref(`profiles/${profID}/jobExp`).push().key;

  const state = (updProfile) => {
    batch(() => {
      dispatch(setProfile(updProfile));
      dispatch(setProgress(100));
      dispatch(setStage2Form(false));
    });
  };

  const onJobExpUpdate = (err) => {
    if (err) return console.log(err);

    db.ref(`profiles/${profID}`).once("value", (profileSnap) => {
      dispatch(setProgress(50));

      const profDB = profileSnap.val();

      if (profDB.stage === 1) {
        const profNew = { ...profile, stage: 2, jobExp: profDB.jobExp };
        db.ref(`profiles/${profID}`).update({ stage: 2 }, () => state(profNew));
      }

      if (profDB.stage > 1) {
        state({ ...profile, jobExp: profDB.jobExp });
      }
    });
  };

  db.ref(`profiles/${profID}/jobExp`).update(
    { [jobID]: { ...data, jobID } },
    onJobExpUpdate
  );
};

export const updateJobExperience = (jobID, data) => (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
  });

  const profile = getState().main.profile;
  const profID = getState().init.user.profileID;

  const onUpdate = (err) => {
    if (err) return console.log(err);

    const jobExp = { ...profile.jobExp, [jobID]: data };

    batch(() => {
      dispatch(setProfile({ ...profile, jobExp }));
      dispatch(setProgress(100));
    });
  };

  db.ref(`profiles/${profID}/jobExp/${jobID}`).update(data, onUpdate);
};

export const removeJobExperience = (jobID) => (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
  });

  const profID = getState().init.user.profileID;
  const profile = getState().main.profile;

  const onSet = (err) => {
    if (err) return console.log(err);

    const jobExp = { ...profile.jobExp };
    delete jobExp[jobID];

    batch(() => {
      dispatch(setProfile({ ...profile, jobExp }));
      dispatch(setProgress(100));
    });
  };

  db.ref(`profiles/${profID}/jobExp/${jobID}`).set(null, onSet);
};

// handle starred

export const getStarredList = () => async (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(0));
    dispatch(setLoadStarredList(true));
  });

  const starred = Object.keys(getState().init.user.starred || {});

  const starredPromisesNoAva = starred.map((profileID) =>
    db.ref(`profiles/${profileID}`).once("value")
  );

  const starredSnaps = await Promise.all(starredPromisesNoAva)
    .then((snaps) => snaps.map((sn) => sn.val()))
    .catch((err) => console.log(err));

  if (starredSnaps.length > 0) {
    const starredPromises = await starredSnaps.map(async (profile) => {
      const avatarURL = await getAvatar(profile.avatarPath);

      const jobExpTotal = totalPeriodCalc(profile.jobExp);

      return { ...profile, avatarURL, jobExpTotal };
    });

    dispatch(setProgress(75));

    const profilesFulfiled = await Promise.all(starredPromises);

    batch(() => {
      dispatch(setStarredList(profilesFulfiled.reverse()));
      dispatch(setLoadStarredList(false));
      dispatch(setProgress(100));
    });
  }

  if (starredSnaps.length === 0) {
    batch(() => {
      dispatch(setStarredList([]));
      dispatch(setLoadStarredList(false));
      dispatch(setProgress(100));
    });
  }

  // console.log(starredSnaps);
};

export const handleStarred = (profileID) => (dispatch, getState) => {
  const user = getState().init.user;
  const starred = user.starred;

  const checkStarred = starred ? profileID in starred : null;

  if (!checkStarred) {
    const onUpdate = (err) => {
      if (err) return console.log(err);

      dispatch(setStarred({ ...starred, [profileID]: profileID }));
    };

    return db
      .ref(`users/${user.userID}/starred`)
      .update({ [profileID]: profileID }, onUpdate);
  }

  if (checkStarred) {
    const onUpdate = (err) => {
      if (err) return console.log(err);

      delete starred[profileID];

      dispatch(setStarred({ ...starred }));
    };

    return db
      .ref(`users/${user.userID}/starred`)
      .update({ [profileID]: null }, onUpdate);
  }
};
