import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  amountSpent: number;
  date: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

class Day extends Component<Props> {
  public render() {
    return (
      <View
        style={{
          paddingVertical: 5,
          alignItems: "center",
          height: 55,
          flexDirection: "row"
        }}
        key={this.props.date}
      >
        <Text style={[styles.text, styles.date]}>{this.props.date}</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text: any) => {
            if (!isNaN(text)) {
              this.props.updateAmountSpent(parseInt(text, 10), this.props.date);
            }
          }}
          style={[styles.input, styles.text]}
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
    width: 60,
    marginHorizontal: 4,
    borderRadius: 2
  }
});

export default Day;
