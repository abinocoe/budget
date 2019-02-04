import _ from "lodash";
import React, { Component } from "react";
import { Picker } from "react-native";
import { StyleSheet } from "react-native";

const DAYSOFMONTH = _.range(1, 32);

interface Props {
  updateIntervalStartDate: (intervalStart: number) => void;
  intervalStartDate: number;
}

class DateSelection extends Component<Props> {
  public render() {
    return (
      <Picker
        style={styles.bg}
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

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#FFF9D0",
    flex: 1 
  },
});

export default DateSelection;
