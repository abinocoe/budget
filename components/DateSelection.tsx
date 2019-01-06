import _ from "lodash";
import React, { Component } from "react";
import { Picker } from "react-native";

import IntervalStartContext from "../context/intervalStart";

const DAYSOFMONTH = _.range(1, 32);

interface State {
  intervalStartDate?: number;
}

class DateSelection extends Component<{}, State> {
  public state = {
    intervalStartDate: 1
  };

  public render() {
    return (
      <IntervalStartContext.Provider value={this.state.intervalStartDate}>
        <Picker
          style={{ height: 20, width: 50 }}
          selectedValue={this.state.intervalStartDate}
          onValueChange={itemValue =>
            this.setState({ intervalStartDate: itemValue })
          }
        >
          {DAYSOFMONTH.map(date => (
            <Picker.Item label={date.toString()} value={date} key={date} />
          ))}
        </Picker>
      </IntervalStartContext.Provider>
    );
  }
}

export default DateSelection;
