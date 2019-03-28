import _ from "lodash";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { CustomPicker } from "react-native-custom-picker";

import * as colours from "../constants/colours";

const DAYSOFMONTH = _.range(1, 32);
const DaysObjects = DAYSOFMONTH.map(date => {
  return { value: date, label: date.toString() };
});

interface Props {
  updateIntervalStartDate: (intervalStart: number) => void;
  intervalStartDate: number;
}

interface State {
  showPicker: boolean;
}

class DateSelection extends Component<Props, State> {
  public state: Readonly<State> = {
    showPicker: false
  };

  public render() {
    return (
      <>
        <CustomPicker
          options={DaysObjects}
          onValueChange={itemValue => {
            this.props.updateIntervalStartDate(itemValue.value);
            this.setState({ showPicker: false });
          }}
          fieldTemplate={() => {
            return (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 30,
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginBottom: 5,
                    borderRadius: 5,
                    width: "90%",
                    backgroundColor: colours.blue,
                    textAlign: "center",
                    color: "white",
                    elevation: 3
                  }}
                >
                  {this.props.intervalStartDate}
                </Text>
                <Text style={{ fontSize: 12 }}>Period start date</Text>
              </View>
            );
          }}
          optionTemplate={settings => {
            const { item } = settings;
            return (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 30,
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginBottom: 5,
                    borderRadius: 5,
                    width: "40%",
                    backgroundColor: colours.blue,
                    textAlign: "center",
                    color: "white",
                    elevation: 3
                  }}
                >
                  {item.label}
                </Text>
              </View>
            );
          }}
        />
      </>
    );
  }
}

export default DateSelection;
