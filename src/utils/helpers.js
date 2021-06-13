import { storage } from "./firebase";

import { colors } from "./colors";

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

// Sorts functions

export const sortJobExp = (jobExpDB) => {
  return Object.values(jobExpDB || {}).sort((a, b) => {
    const dateSrtToMs = (endDate) => (endDate ? new Date(endDate) : new Date());
    return dateSrtToMs(b.endDate) - dateSrtToMs(a.endDate);
  });
};

// Period calculators

class Periods {
  constructor() {
    this.monthsDict = {
      f1t1: "месяц",
      f2t4: "месяца",
      f5t10: "месяцев",
    };
    this.yearsDict = {
      f1t1: "год",
      f2t4: "года",
      f5t10: "лет",
    };
  }

  numToWord(num, dict) {
    switch (true) {
      case num === 0:
        return ``;

      case num > 10 && num < 20:
        return `${num} ${dict.f5t10} `;

      case num % 10 === 1:
        return `${num} ${dict.f1t1} `;

      case num % 10 > 1 && num % 10 < 5:
        return `${num} ${dict.f2t4} `;

      default:
        return `${num} ${dict.f5t10} `;
    }
  }

  dateToMMYYYY(dateStr) {
    if (!dateStr) return "текущее время";
    const options = { year: "numeric", month: "long" };

    return new Date(dateStr).toLocaleString("ru", options);
  }

  jobRangeWorder(dateMs) {
    const months = dateMs.getMonth();
    const years = dateMs.getFullYear() - 1970;

    return `${this.numToWord(years, this.yearsDict)}${this.numToWord(
      months,
      this.monthsDict
    )}`;
  }
}

export const periodCalc = (startDate, endDate) => {
  const periods = new Periods();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  return (
    <span>
      {`${periods.dateToMMYYYY(startDate)} — ${periods.dateToMMYYYY(endDate)} `}
      <span style={{ color: colors.fontTitle }}>
        {periods.jobRangeWorder(new Date(end - start))}
      </span>
    </span>
  );
};

export const totalPeriodCalc = (jobExp) => {
  if (!jobExp) return "Не указан";

  const periods = new Periods();

  const jobExpTotalMs = Object.values(jobExp).reduce((sum, pfile) => {
    const start = new Date(pfile.startDate);
    const end = pfile.endDate ? new Date(pfile.endDate) : new Date();

    const diff = +end - start;

    return sum + diff;
  }, 0);

  return `${periods.jobRangeWorder(new Date(jobExpTotalMs))}`;
};
