import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { today } from "../lib/date";

import Day from "./Day";
import DayInputsContainer from "./DayInputsContainer";

const currentDate = new Date();

afterEach(() => {
  today.setDate(currentDate.getDate());
  today.setMonth(currentDate.getMonth());
  today.setFullYear(currentDate.getFullYear());
});

describe("DayInputsContainer", () => {
  it("renders correctly", () => {
    today.setDate(4);
    today.setMonth(3);
    const output = shallow(
      <DayInputsContainer
        amountsSpentPeriodStartMonth={{ 30: 1000, 31: 1000 }}
        amountsSpentPeriodEndMonth={{ 1: 1000, 2: 1000, 3: 433 }}
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
        amountsSpentPeriodStartMonth={{ 30: 1000, 31: 1000 }}
        amountsSpentPeriodEndMonth={{ 1: 1000, 2: 1000, 3: 433 }}
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
