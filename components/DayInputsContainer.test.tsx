import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

// @ts-ignore
import { dateToday, today } from "../lib/date";

import Day from "./Day";
import DayInputsContainer from "./DayInputsContainer";

const currentDate = new Date();

afterEach(() => {
  today.setDate(currentDate.getDate());
  today.setMonth(currentDate.getMonth());
  today.setFullYear(currentDate.getFullYear());
  // @ts-ignore
  dateToday = today.getDate();
});

describe("DayInputsContainer", () => {
  it("renders correctly", () => {
    // @ts-ignore
    dateToday = 4;
    today.setMonth(3);
    const output = shallow(
      <DayInputsContainer
        amountsSpentThisMonth={{ 1: 1000, 2: 1000, 3: 433 }}
        amountsSpentLastMonth={{ 30: 1000, 31: 1000 }}
        startNumber={10}
        updateAmountSpent={() => null}
      />
    );
    expect(toJson(output)).toMatchSnapshot();
  });

  it("responds to day amount update from child", () => {
    const amountSpentUpdateSpy = jest.fn();
    const output = shallow(
      <DayInputsContainer
        amountsSpentThisMonth={{ 1: 1000, 2: 1000, 3: 433 }}
        amountsSpentLastMonth={{ 30: 1000, 31: 1000 }}
        startNumber={10}
        updateAmountSpent={amountSpentUpdateSpy}
      />
    );
    // @ts-ignore
    output
      .find(Day)
      .first()
      .prop("updateAmountSpent")(300);
    expect(amountSpentUpdateSpy).toHaveBeenCalledTimes(1);
    expect(amountSpentUpdateSpy).toHaveBeenLastCalledWith(300);
  });
});
