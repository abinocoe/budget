import { shallow } from "enzyme";
import React from "react";

import { today } from "../lib/date";

import BudgetCalculator from "./BudgetCalculator";

const currentDate = new Date();

afterEach(() => {
  today.setDate(currentDate.getDate());
  today.setMonth(currentDate.getMonth());
  today.setFullYear(currentDate.getFullYear());
});

it("renders correctly", () => {
  today.setDate(25);
  today.setMonth(2);
  today.setFullYear(2019);
  const output = shallow(<BudgetCalculator />);
  expect(output).toMatchSnapshot();
});
