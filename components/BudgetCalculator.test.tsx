import { shallow } from "enzyme";
import React from "react";

import BudgetCalculator from "./BudgetCalculator";

it("renders correctly", () => {
  Date.now = jest.fn(() => 1487076708000);
  const output = shallow(<BudgetCalculator />);
  expect(output).toMatchSnapshot();
});
