import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { getFriendlyDate } from "../lib/date";

interface Props {
  amountSpent: number;
  date: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

class Day extends Component<Props> {
  public render() {
    return (
      <ListItem
        title={getFriendlyDate(this.props.date)}
        input={{
          keyboardType: "number-pad",
          onChangeText: (text: any) => {
            if (!isNaN(text)) {
              this.props.updateAmountSpent(parseInt(text, 10), this.props.date);
            }
          },
          containerStyle: styles.input,
          value: isNaN(this.props.amountSpent)
            ? ""
            : this.props.amountSpent.toString()
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold"
  },
  date: {
    width: 20
  },
  input: {
    backgroundColor: "pink",
    borderRadius: 2
  }
});

export default Day;
