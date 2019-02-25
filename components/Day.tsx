import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";

import { getFriendlyDate } from "../lib/date";

interface Props {
  amountSpent: number;
  date: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

interface State {
  editable: boolean;
  value: string;
  rawValue: string;
}
class Day extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      editable: false,
      value: "",
      rawValue: ""
    };
    this.amountChanged.bind(this);
    this.handleButtonPress.bind(this);
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
        const intAmount = newRawValue.slice(0, newRawValue.length - 2);
        const pennyAmount = newRawValue.slice(-2);

        tmpAmount = `${intAmount}.${pennyAmount}`;
      }

      this.setState({
        value: tmpAmount,
        rawValue: newRawValue
      });
    }
  }

  public handleButtonPress = () =>
    this.setState({ editable: !this.state.editable });

  public render() {
    return (
      <ListItem
        title={getFriendlyDate(this.props.date)}
        input={{
          containerStyle: styles.input,
          editable: this.state.editable,
          keyboardType: "number-pad",
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
          placeholder: (this.props.amountSpent / 100).toFixed(2),
          value: this.state.value
        }}
        rightElement={
          <Button
            buttonStyle={{
              backgroundColor: this.state.editable ? "#8FCB9B" : "#DD2D4A"
            }}
            icon={
              this.state.editable ? (
                <Icon name="check" size={20} color="white" />
              ) : (
                <Icon name="clear" size={20} color="white" />
              )
            }
            onPress={this.handleButtonPress}
          />
        }
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
    backgroundColor: "#FFC0CB",
    borderRadius: 2
  }
});

export default Day;
