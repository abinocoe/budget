import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { CustomPicker } from "react-native-custom-picker";

import DateSelection from "./DateSelection";

describe("DateSelection", () => {
  it("renders correctly", () => {
    const output = shallow(
      <DateSelection
        intervalStartDate={1}
        updateIntervalStartDate={jest.fn()}
      />
    );
    expect(toJson(output)).toMatchSnapshot();
  });

  it("calls parent function to update start date", async () => {
    const updateSpy = jest.fn();
    const output = shallow(
      <DateSelection
        intervalStartDate={1}
        updateIntervalStartDate={updateSpy}
      />
    );
    // @ts-ignore
    output.find(CustomPicker).prop("onValueChange")({ value: 25 });
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(25);
  });
});
