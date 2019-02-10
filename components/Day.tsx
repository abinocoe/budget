import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
  amountSpent: number;
  date: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

class Day extends Component<Props> {
  public render() {
    return (
      <View
        style={{ flexDirection: "row", paddingVertical: 10 }}
        key={this.props.date}
      >
        <Text>{this.props.date}</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text: any) => {
            if (!isNaN(text)) {
              this.props.updateAmountSpent(parseInt(text, 10), this.props.date);
            }
          }}
          style={{
            borderColor: "red",
            borderWidth: 1,
            width: "10%",
            marginHorizontal: 4
          }}
          value={
            isNaN(this.props.amountSpent)
              ? ""
              : this.props.amountSpent.toString()
          }
        />
      </View>
    );
  }
}

export default Day;
