import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  allowanceAmount: number;
  updateAllowance: (amount: string) => void;
}

class PeriodAllowanceInput extends Component<Props> {
  public render() {
    return (
      <View style={styles.allowanceInput} >
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

const styles = StyleSheet.create({
  allowanceInput: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 24,
    borderWidth: 2, 
    borderColor: '#FFF9D0',
    borderRadius: 4,
    backgroundColor: 'rgba(255,249,208,0.8)',
    margin: 16,
  },
  bg: {
    backgroundColor: "#FB9190",
    flex: 1 
  },
});

export default PeriodAllowanceInput;
