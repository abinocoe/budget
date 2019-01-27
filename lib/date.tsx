import _ from "lodash";

const today = new Date();
const dateToday = today.getDate();

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
