import _ from "lodash";
import React, { Component } from "react";
import { Picker, Text, TouchableOpacity, View } from "react-native";

import * as colours from "../constants/colours";

const DAYSOFMONTH = _.range(1, 32);

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
      <TouchableOpacity
        onPress={() => this.setState({ showPicker: !this.state.showPicker })}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              paddingHorizontal: 5,
              marginTop: 10,
              marginBottom: 5,
              borderRadius: 5,
              width: "90%",
              backgroundColor: colours.mauve,
              textAlign: "center",
              color: "white"
            }}
          >
            {this.props.intervalStartDate}
          </Text>
          <Text style={{ fontSize: 12 }}>Period start date</Text>
        </View>
        {this.state.showPicker && (
          <Picker
            selectedValue={this.props.intervalStartDate}
            onValueChange={itemValue =>
              this.props.updateIntervalStartDate(itemValue)
            }
          >
            {DAYSOFMONTH.map(date => (
              <Picker.Item label={date.toString()} value={date} key={date} />
            ))}
          </Picker>
        )}
      </TouchableOpacity>
    );
  }
}

export default DateSelection;
