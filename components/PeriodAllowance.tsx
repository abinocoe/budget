import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";

interface Props {
  allowanceAmount: number;
  periodMainMonth: number;
  updateAllowance: (amount: number) => void;
}

interface State {
  showInput: boolean;
  value: string;
  rawValue: string;
}

const monthStrings: { [key: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

class PeriodAllowanceInput extends Component<Props> {
  public state: Readonly<State> = {
    showInput: false,
    value: "",
    rawValue: ""
  };

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
    const { periodMainMonth, updateAllowance, allowanceAmount } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showInput: !this.state.showInput })}
        >
          <Text style={styles.text}>
            {`Total amount ${monthStrings[periodMainMonth]}: ${
              isNaN(allowanceAmount) ? "" : (allowanceAmount / 100).toFixed(2)
            }`}
          </Text>
        </TouchableOpacity>
        {this.state.showInput && (
          <Input
            inputStyle={{ textAlign: "right" }}
            inputContainerStyle={styles.input}
            keyboardType="number-pad"
            onChangeText={text => {
              this.amountChanged(text);
            }}
            onEndEditing={e => {
              if (e.nativeEvent.text !== "") {
                const intAmount = e.nativeEvent.text.replace(".", "");
                updateAllowance(parseInt(intAmount, 10));
                this.setState({ value: "", rawValue: "" });
              }
            }}
            placeholder={
              isNaN(allowanceAmount)
                ? "0.00"
                : (allowanceAmount / 100).toFixed(2)
            }
            value={this.state.value}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "rgba(0,0,0,0)",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 2,
    width: "50%"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default PeriodAllowanceInput;
