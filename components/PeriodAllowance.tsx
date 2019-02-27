import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";

import * as colours from "../constants/colours";

interface Props {
  allowanceAmount: number;
  updateAllowance: (amount: number) => void;
}

interface State {
  showInput: boolean;
  value: string;
  rawValue: string;
}

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
    const { updateAllowance, allowanceAmount } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showInput: !this.state.showInput })}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                paddingHorizontal: 5,
                marginTop: 10,
                marginBottom: 5,
                borderRadius: 5,
                backgroundColor: colours.mauve,
                width: "90%",
                textAlign: "center",
                color: "white"
              }}
            >
              {isNaN(allowanceAmount) ? "" : (allowanceAmount / 100).toFixed(2)}
            </Text>
            <Text style={styles.text}>{`Total amount this month`}</Text>
          </View>
        </TouchableOpacity>
        {this.state.showInput && (
          <Input
            inputStyle={{
              textAlign: "right",
              fontSize: 25
            }}
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
    borderRadius: 5,
    marginTop: 5
  },
  text: {
    fontSize: 12
  }
});

export default PeriodAllowanceInput;
