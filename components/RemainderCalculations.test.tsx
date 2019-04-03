import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import RemainderCalculations from "./RemainderCalculations";

describe("RemainderCalculations", () => {
  it("renders correctly", () => {
    const output = shallow(
      <RemainderCalculations
        dailyAllowance={1000}
        daysElapsed={2}
        daysRemaining={29}
        intervalStartDate={25}
        totalAllowance={30000}
        totalSpent={3000}
        updateAllowance={() => null}
        updateIntervalStartDate={() => null}
      />
    );
    expect(toJson(output)).toMatchSnapshot();
  });

  it("calculates the total remaining", () => {
    const output = shallow(
      <RemainderCalculations
        dailyAllowance={1000}
        daysElapsed={2}
        daysRemaining={29}
        intervalStartDate={25}
        totalAllowance={30000}
        totalSpent={3000}
        updateAllowance={() => null}
        updateIntervalStartDate={() => null}
      />
    );
    const debitAmount = output.findWhere(
      node => node.prop("testID") === "amountDebit"
    );
    expect(debitAmount.first().prop("children")).toEqual("-10.00");
  });

  it("calculates the average left for remaining days", () => {
    const output = shallow(
      <RemainderCalculations
        dailyAllowance={1400}
        daysElapsed={10}
        daysRemaining={22}
        intervalStartDate={25}
        totalAllowance={43400}
        totalSpent={13259}
        updateAllowance={() => null}
        updateIntervalStartDate={() => null}
      />
    );
    const debitAmount = output.findWhere(
      node => node.prop("testID") === "averageRemain"
    );
    expect(debitAmount.first().prop("children")).toEqual("13.70");
    const output2 = shallow(
      <RemainderCalculations
        dailyAllowance={1000}
        daysElapsed={31}
        daysRemaining={1}
        intervalStartDate={4}
        totalAllowance={31000}
        totalSpent={30000}
        updateAllowance={() => null}
        updateIntervalStartDate={() => null}
      />
    );
    const debitAmount2 = output2.findWhere(
      node => node.prop("testID") === "averageRemain"
    );
    expect(debitAmount2.first().prop("children")).toEqual("10.00");
  });

  it("calculates the total amount remaining", () => {
    const output = shallow(
      <RemainderCalculations
        dailyAllowance={1000}
        daysElapsed={10}
        daysRemaining={22}
        intervalStartDate={25}
        totalAllowance={31000}
        totalSpent={21000}
        updateAllowance={() => null}
        updateIntervalStartDate={() => null}
      />
    );
    const amountRemaining = output.findWhere(
      node => node.prop("testID") === "totalRemain"
    );
    expect(amountRemaining.first().prop("children")).toEqual("100.00");
  });
});
