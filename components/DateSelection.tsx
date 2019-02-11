import _ from "lodash";
import React, { Component } from "react";
import { Picker, Text, TouchableOpacity } from "react-native";

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
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Period start date: {this.props.intervalStartDate}
        </Text>
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
