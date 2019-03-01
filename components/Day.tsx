import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { getFriendlyDate } from "../lib/date";

interface Props {
  amountSpent: number;
  date: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

interface State {
  value: string;
  rawValue: string;
}
class Day extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      rawValue: ""
    };
    this.amountChanged.bind(this);
  }

  public amountChanged(inputText: string) {
    let tmpAmount = "";
    const tmpValue = inputText.slice(-1);
    const newRawValue = this.state.rawValue + tmpValue;

    if (this.state.value.length > inputText.length) {
      this.setState({
        value: "",
        rawValue: ""
      });
    } else {
      if (newRawValue.length === 1) {
        tmpAmount = `0.0${newRawValue}`;
      } else if (newRawValue.length === 2) {
        tmpAmount = `0.${newRawValue}`;
      } else {
        tmpAmount = inputText
          .replace(".", "")
          .replace(/(\d{2})\b$/, ".$1")
          .replace(/^0(\d.\d{2})/, "$1");
      }

      this.setState({
        value: tmpAmount,
        rawValue: newRawValue
      });
    }
  }

  public render() {
    return (
      <ListItem
        title={getFriendlyDate(this.props.date)}
        input={{
          containerStyle: styles.input,
          keyboardType: "numeric",
          onChangeText: text => {
            this.amountChanged(text);
          },
          onEndEditing: e => {
            if (e.nativeEvent.text !== "") {
              const intAmount = e.nativeEvent.text.replace(".", "");
              this.props.updateAmountSpent(
                parseInt(intAmount, 10),
                this.props.date
              );
              this.setState({ value: "", rawValue: "" });
            }
          },
          placeholder: this.props.amountSpent
            ? (this.props.amountSpent / 100).toFixed(2)
            : "0.00",
          value: this.state.value
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
    borderRadius: 4,
    borderColor: "pink",
    borderWidth: 1,
    paddingRight: 5
  }
});

export default Day;
