import _ from "lodash";
import React, { Component } from "react";
import { Picker, Text, TouchableOpacity, View } from "react-native";

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
    return this.state.showPicker ? (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showPicker: !this.state.showPicker })}
        >
          <Text>X</Text>
        </TouchableOpacity>
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
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => this.setState({ showPicker: !this.state.showPicker })}
      >
        <Text>{this.props.intervalStartDate}</Text>
      </TouchableOpacity>
    );
  }
}

export default DateSelection;
