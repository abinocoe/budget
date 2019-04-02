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
        {!this.state.showInput ? (
          <TouchableOpacity
            onPress={() => this.setState({ showInput: !this.state.showInput })}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  paddingHorizontal: 5,
                  marginTop: 10,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: colours.pink,
                  width: "90%",
                  textAlign: "center",
                  color: "white",
                  elevation: 3
                }}
              >
                {isNaN(allowanceAmount)
                  ? ""
                  : (allowanceAmount / 100).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Input
              testID="input"
              autoFocus={true}
              containerStyle={{
                marginTop: 10,
                marginBottom: 5,
                backgroundColor: "pink",
                width: "90%",
                borderRadius: 5,
                elevation: 2,
                height: 40
              }}
              style={{ color: "white" }}
              inputStyle={{
                color: "white",
                textAlign: "right",
                fontSize: 30,
                padding: 0,
                paddingRight: 5,
                borderColor: "transparent"
              }}
              placeholderTextColor="white"
              inputContainerStyle={styles.inputContainerStyle}
              keyboardType="number-pad"
              onChangeText={text => {
                this.amountChanged(text);
              }}
              onEndEditing={e => {
                this.setState({ showInput: !this.state.showInput });
                if (e.nativeEvent.text !== "") {
                  const intAmount = e.nativeEvent.text.replace(".", "");
                  updateAllowance(parseInt(intAmount, 10));
                  this.setState({
                    value: "",
                    rawValue: ""
                  });
                }
              }}
              placeholder={
                isNaN(allowanceAmount)
                  ? "0.00"
                  : (allowanceAmount / 100).toFixed(2)
              }
              value={this.state.value}
            />
          </View>
        )}
        <Text style={styles.text}>Total amount this month</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomColor: "rgba(0,0,0,0)"
  },
  text: {
    fontSize: 12
  }
});

export default PeriodAllowanceInput;
