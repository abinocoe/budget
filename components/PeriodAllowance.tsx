import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  allowanceAmount: number;
  updateAllowance: (amount: string) => void;
}

class PeriodAllowanceInput extends Component<Props> {
  public render() {
    const date = new Date();
    const month = date.toLocaleString("en-uk", { month: "long" });
    return (
      <View style={{ flexDirection: "row", alignItems: "center", height: 50 }}>
        <Text style={styles.text}>
          Total amount {month.toLocaleLowerCase()}:{" "}
        </Text>
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
