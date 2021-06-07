import { storage } from "./firebase";

export const imgUploader = (file, num, userID, addPath = "") => {
  if (typeof file === "string") return true;

  const fileNamer = (fName, num) => {
    const fileExt = fName.split(".")[fName.split(".").length - 1];
    return `photo${num}.${fileExt}`;
  };

  return new Promise((resolve) => {
    const metadata = {
      cacheControl: "public,max-age=7200",
    };

    const uploadTask = storage
      .ref()
      .child(`profiles/${userID}/${addPath}${fileNamer(file.name, num)}`)
      .put(file, metadata);

    uploadTask.on(
      "state_changed",
      (snap) => {}, // progress
      (error) => console.log(error), // error
      () => resolve(true) // complete
    );
  });
};

export const getAvatar = async (path) => {
  const promise = (await storage.ref(path).listAll()).items.map((it) =>
    it.getDownloadURL()
  );

  const resolve = await Promise.all(promise).then((res) => res[0]);

  return resolve;
};
