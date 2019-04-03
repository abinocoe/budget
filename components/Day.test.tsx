import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

// @ts-ignore
import { dateToday, today } from "../lib/date";

import Day from "./Day";

const currentDate = new Date();

afterEach(() => {
  today.setDate(currentDate.getDate());
  today.setMonth(currentDate.getMonth());
  today.setFullYear(currentDate.getFullYear());
});

describe("Day", () => {
  it("renders correctly on the 3rd of April 2019", () => {
    today.setMonth(3);
    today.setFullYear(2019);
    const output = shallow(
      <Day date={3} amountSpent={100} updateAmountSpent={() => null} />
    );
    expect(toJson(output)).toMatchSnapshot();
  });

  it("renders correctly on the 3rd of April 2019 with the input showing", () => {
    today.setMonth(3);
    today.setFullYear(2019);
    const output = shallow(
      <Day date={3} amountSpent={100} updateAmountSpent={() => null} />
    );
    output.setState({ editable: true });
    expect(toJson(output)).toMatchSnapshot();
  });
});
