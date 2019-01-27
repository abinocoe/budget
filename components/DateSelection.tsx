import _ from "lodash";
import React, { Component } from "react";
import { Picker } from "react-native";

const DAYSOFMONTH = _.range(1, 32);

interface Props {
  updateIntervalStartDate: (intervalStart: number) => void;
  intervalStartDate: number;
}

class DateSelection extends Component<Props> {
  public render() {
    return (
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
    );
  }
}

export default DateSelection;
