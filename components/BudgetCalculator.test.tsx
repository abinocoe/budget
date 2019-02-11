import { shallow } from "enzyme";
import React from "react";

import BudgetCalculator from "./BudgetCalculator";

it("renders correctly", () => {
  const output = shallow(<BudgetCalculator />);
  expect(output).toMatchSnapshot();
});
