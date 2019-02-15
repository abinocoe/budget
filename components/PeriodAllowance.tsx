import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  allowanceAmount: number;
  updateAllowance: (amount: string) => void;
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
  public render() {
    const date = new Date();
    const month = date.getMonth();
    return (
      <View style={{ flexDirection: "row", alignItems: "center", height: 50 }}>
        <Text style={styles.text}>Total amount {monthStrings[month]}: </Text>
        <TextInput
          style={[styles.text, { width: 70 }]}
          keyboardType="number-pad"
          onChangeText={(text: any) => {
            this.props.updateAllowance(text);
          }}
          value={
            isNaN(this.props.allowanceAmount)
              ? ""
              : this.props.allowanceAmount.toString()
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
  }
});

export default PeriodAllowanceInput;
