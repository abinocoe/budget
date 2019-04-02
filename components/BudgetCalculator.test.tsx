import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { AsyncStorage } from "react-native";

// @ts-ignore
import { dateToday, today } from "../lib/date";

import BudgetCalculator from "./BudgetCalculator";

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
  // @ts-ignore
  dateToday = today.getDate();
});

it("renders correctly", async () => {
  today.setDate(25);
  today.setMonth(2);
  today.setFullYear(2019);
  // @ts-ignore
  dateToday = 25;
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
