import {
  getDisplayDays,
  getFriendlyDate,
  getPeriodStartMonth,
  isDateInThisMonth,
  numberOfDaysInStartMonth,
  today
} from "./date";

const currentDate = new Date();

afterEach(() => {
  today.setDate(currentDate.getDate());
  today.setMonth(currentDate.getMonth());
  today.setFullYear(currentDate.getFullYear());
});

describe("numberOfDaysInStartMonth", () => {
  it("returns the correct number of days for January", () => {
    expect(numberOfDaysInStartMonth(0)).toEqual(31);
  });

  it("returns the correct number of days in February in a leap year", () => {
    today.setDate(1);
    today.setMonth(1);
    today.setFullYear(2016);
    expect(numberOfDaysInStartMonth(1)).toEqual(29);
  });

  it("returns the correct number of days in February NOT in a leap year", () => {
    today.setFullYear(2017);
    expect(numberOfDaysInStartMonth(1)).toEqual(28);
  });
});

describe("getDisplayDays", () => {
  it("returns an appropriate array for a start date in January to a current date in February", () => {
    today.setDate(3);
    today.setMonth(1);
    const daysArray = getDisplayDays(28, 0);
    expect(daysArray).toEqual(
      expect.arrayContaining([28, 29, 30, 31, 1, 2, 3])
    );
    expect(daysArray.length).toEqual(7);
  });

  it("returns an appropriate array for a start date in Feb in a leap year to a current date in March", () => {
    today.setDate(3);
    today.setFullYear(2016);
    const daysArray = getDisplayDays(28, 1);
    expect(daysArray).toEqual(expect.arrayContaining([28, 29, 1, 2, 3]));
    expect(daysArray.length).toEqual(5);
  });

  it("returns an appropriate array for a start date in Feb NOT in a leap year to a current date in March", () => {
    today.setDate(3);
    today.setFullYear(2017);
    const daysArray = getDisplayDays(27, 1);
    expect(daysArray).toEqual(expect.arrayContaining([27, 28, 1, 2, 3]));
    expect(daysArray.length).toEqual(5);
  });

  it("returns an appropriate array for a start and finish date within the same month", () => {
    today.setDate(27);
    const daysArray = getDisplayDays(19, 1);
    expect(daysArray).toEqual(
      expect.arrayContaining([19, 20, 21, 22, 23, 24, 25, 26, 27])
    );
    expect(daysArray.length).toEqual(9);
  });
});

describe("getPeriodStartMonth", () => {
  it("returns the same month when the current date is greater than or equal to the period start date", () => {
    today.setDate(27);
    today.setMonth(7);
    expect(getPeriodStartMonth(4)).toEqual(7);
  });

  it("returns the previous month when the current date is less than the period start date", () => {
    today.setDate(4);
    today.setMonth(7);
    expect(getPeriodStartMonth(27)).toEqual(6);
  });

  it("returns December as previous month from January", () => {
    today.setDate(4);
    today.setMonth(0);
    expect(getPeriodStartMonth(27)).toEqual(11);
  });
});

describe("getFriendlyDate", () => {
  it("returns a string with day of week and ordinal for a given date", () => {
    today.setDate(4);
    today.setMonth(0);
    today.setFullYear(2019);
    expect(getFriendlyDate(27)).toEqual("Thu 27th");
  });

  it("does not rollover to incorrect month when called for the 31st", () => {
    today.setDate(4);
    today.setMonth(3);
    today.setFullYear(2019);
    expect(getFriendlyDate(31)).toEqual("Sun 31st");
  });
});

describe("isDateInThisMonth (relative to period start date)", () => {
  it("returns true for 22nd on the 26th where the period start date is 25", () => {
    today.setDate(26);
    const output = isDateInThisMonth(22, 25);
    expect(output).toEqual(true);
  });

  it("returns true for 22nd on the 6th where the period start date is 25", () => {
    today.setDate(6);
    const output = isDateInThisMonth(22, 25);
    expect(output).toEqual(true);
  });

  it("returns true for 22nd on the 26th where the period start date is 12", () => {
    today.setDate(26);
    const output = isDateInThisMonth(22, 12);
    expect(output).toEqual(true);
  });

  it("returns false for 22nd on the 6th where the period start date is 12", () => {
    today.setDate(6);
    const output = isDateInThisMonth(22, 12);
    expect(output).toEqual(false);
  });
});
