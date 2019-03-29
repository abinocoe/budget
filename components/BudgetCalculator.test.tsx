import { shallow } from "enzyme";
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
  expect(output).toMatchSnapshot();
});

it("", async () => {
  shallow(<BudgetCalculator />);
  await nextTick();
  expect(AsyncStorage.multiGet).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
});
