import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { AsyncStorage } from "react-native";

import { today } from "../lib/date";

import BudgetCalculator from "./BudgetCalculator";
import DayInputsContainer from "./DayInputsContainer";
import RemainderCalculations from "./RemainderCalculations";

const currentDate = new Date();
const nextTick = () => new Promise(resolve => setTimeout(resolve, 0));

beforeAll(() => {
  jest.mock("AsyncStorage");
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  today.setDate(currentDate.getDate());
  today.setMonth(currentDate.getMonth());
  today.setFullYear(currentDate.getFullYear());
});

it("renders correctly", async () => {
  today.setDate(25);
  today.setMonth(2);
  today.setFullYear(2019);
  await nextTick();
  const output = shallow(<BudgetCalculator />);
  expect(toJson(output)).toMatchSnapshot();
});

it("retrieves data on mount", async () => {
  shallow(<BudgetCalculator />);
  await nextTick();
  expect(AsyncStorage.multiGet).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
});

it("recalculates total amount spent when state updates", async () => {
  jest
    .spyOn(AsyncStorage, "getItem")
    .mockImplementationOnce(() => Promise.resolve("50000"))
    .mockImplementationOnce(() => Promise.resolve("25"));
  const multiGetMock = jest.spyOn(AsyncStorage, "multiGet");
  multiGetMock.mockImplementationOnce(() =>
    Promise.resolve([
      ["2-2019", '{ "1": 1000, "2": 1000 }'],
      ["1-2019", '{ "31": 1000, "30": 1000 }']
    ] as [string, string][])
  );
  const output = shallow(<BudgetCalculator />);
  expect(output.state("periodTotalSpent")).toEqual(0);
  await nextTick();
  expect(output.state("periodTotalSpent")).toEqual(4000);
});

describe("updatePeriodTotal", () => {
  it("handles period allowance update from child", async () => {
    const output = shallow(<BudgetCalculator />);
    await nextTick();
    output.find(RemainderCalculations).prop("updateAllowance")(40000);
    expect(output.state("periodTotalAmount")).toEqual(40000);
  });
});

describe("updatePeriodStart", () => {
  it("handles period start date update from child", async () => {
    const output = shallow(<BudgetCalculator />);
    await nextTick();
    expect(output.state("periodStartDate")).toEqual(1);
    output.find(RemainderCalculations).prop("updateIntervalStartDate")(5);
    expect(output.state("periodStartDate")).toEqual(5);
  });
});

describe("updateDayAmountSpent", () => {
  it("handles amount spent update for a specific day from a child", async () => {
    today.setDate(3);
    jest
      .spyOn(AsyncStorage, "getItem")
      .mockImplementationOnce(() => Promise.resolve("50000"))
      .mockImplementationOnce(() => Promise.resolve("25"));
    const multiGetMock = jest.spyOn(AsyncStorage, "multiGet");
    multiGetMock.mockImplementationOnce(() =>
      Promise.resolve([
        ["2-2019", '{ "1": 1000, "2": 1000 }'],
        ["1-2019", '{ "31": 1000, "30": 1000 }']
      ] as [string, string][])
    );
    const output = shallow(<BudgetCalculator />);
    await nextTick();
    output.find(DayInputsContainer).prop("updateAmountSpent")(500, 31);
    expect(output.state("lastMonthAmountsSpent")).toEqual({
      31: 500,
      30: 1000
    });
  });
});
