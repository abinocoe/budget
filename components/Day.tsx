import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Input, ListItem, Text } from "react-native-elements";

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
        rightElement={
          <View style={styles.view}>
            {this.state.editable ? (
              <Input
                autoFocus={true}
                containerStyle={styles.fillView}
                inputContainerStyle={styles.removeUnderline}
                inputStyle={styles.inputStyle}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.amountChanged(text);
                }}
                onEndEditing={e => {
                  if (e.nativeEvent.text !== "") {
                    const intAmount = e.nativeEvent.text.replace(".", "");
                    this.props.updateAmountSpent(
                      parseInt(intAmount, 10),
                      this.props.date
                    );
                  }
                  this.setState({ value: "", rawValue: "", editable: false });
                }}
                placeholder={
                  this.props.amountSpent
                    ? (this.props.amountSpent / 100).toFixed(2)
                    : "0.00"
                }
                placeholderTextColor="#A9A9A9"
                value={this.state.value}
              />
            ) : (
              <Text
                style={styles.text}
                onPress={() => this.setState({ editable: true })}
              >
                {this.props.amountSpent
                  ? (this.props.amountSpent / 100).toFixed(2)
                  : "0.00"}
              </Text>
            )}
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  fillView: {
    paddingHorizontal: 0
  },
  inputStyle: {
    textAlign: "right",
    fontSize: 16,
    paddingRight: 0,
    marginRight: 0,
    paddingVertical: 0
  },
  removeUnderline: {
    borderBottomWidth: 0
  },
  text: {
    fontSize: 16,
    color: "#A9A9A9"
  },
  view: {
    borderRadius: 4,
    borderColor: "pink",
    borderWidth: 1,
    paddingRight: 5,
    width: 100,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-end"
  }
});

export default Day;
