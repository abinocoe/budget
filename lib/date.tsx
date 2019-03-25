import _ from "lodash";

export const today = new Date();
export const dateToday = today.getDate();

const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const numberOfDaysInStartMonth = (startMonth: number) =>
  32 -
  new Date(
    startMonth === 0 ? today.getFullYear() - 1 : today.getFullYear(),
    startMonth,
    32
  ).getDate();

export const getDisplayDays = (startDate: number, startMonth: number) => {
  let days: number[];
  if (dateToday < startDate) {
    days = [
      ..._.range(startDate, numberOfDaysInStartMonth(startMonth) + 1).concat(
        dateToday === 1 ? [1] : _.range(1, dateToday + 1)
      )
    ];
  } else if (dateToday === startDate) {
    days = [startDate];
  } else {
    days = _.range(startDate, dateToday + 1);
  }
  return days;
};

export const getPeriodStartMonth = (startDate: number) => {
  const thisMonth = today.getMonth();
  return dateToday >= startDate
    ? thisMonth
    : thisMonth === 0
    ? 11
    : thisMonth - 1;
};

export const getFriendlyDate = (day: number) => {
  const mutableDate = new Date();
  if (day > dateToday) {
    mutableDate.setDate(day);
    mutableDate.setMonth(today.getMonth() - 1);
  } else {
    mutableDate.setDate(day);
  }
  return `${dayStrings[mutableDate.getDay()]} ${day}${getOrdinal(day)}`;
};

const getOrdinal = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
