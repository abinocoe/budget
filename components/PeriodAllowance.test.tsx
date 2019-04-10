import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import PeriodAllowance from "./PeriodAllowance";

describe("PeriodAllowance", () => {
  it("renders correctly", () => {
    const output = shallow(
      <PeriodAllowance allowanceAmount={50000} updateAllowance={() => null} />
    );
    expect(toJson(output)).toMatchSnapshot();
  });

  it("renders input correctly", () => {
    const output = shallow(
      <PeriodAllowance allowanceAmount={50000} updateAllowance={() => null} />
    );
    output.setState({ showInput: true });
    expect(toJson(output)).toMatchSnapshot();
  });

  it("calls updateAllowance on input submit", () => {
    const upAllSpy = jest.fn();
    const output = shallow(
      <PeriodAllowance allowanceAmount={50000} updateAllowance={upAllSpy} />
    );
    output.setState({ showInput: true });
    const input = output.findWhere(node => {
      return node.prop("testID") === "input";
    });
    input.prop("onEndEditing")({ nativeEvent: { text: "111" } });
    expect(upAllSpy).toHaveBeenCalledWith(111);
  });
});
