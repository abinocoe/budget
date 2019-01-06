import React, { Component } from "react";
import { TextInput, View } from "react-native";

interface Props {
  allowanceAmount: number;
  updateAllowance: (amount: string) => void;
}

class PeriodAllowanceInput extends Component<Props> {
  public render() {
    return (
      <View style={{ borderWidth: 1, borderColor: "black" }}>
        <TextInput
          onChangeText={(text: any) => {
            this.props.updateAllowance(text);
          }}
          value={
            isNaN(this.props.allowanceAmount)
              ? ""
              : this.props.allowanceAmount.toString()
          }
          style={{ width: 50 }}
        />
      </View>
    );
  }
}

export default PeriodAllowanceInput;
