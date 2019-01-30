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
        style={{ flexDirection: "row", paddingVertical: 10 }}
        key={this.props.date}
      >
        <Text style={styles.dayText}>{this.props.date}</Text>
        <TextInput style={styles.amountText}
          keyboardType="number-pad"
          onChangeText={(text: any) => {
            this.props.updateAmountSpent(parseInt(text, 10), this.props.date);
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

const styles = StyleSheet.create({
  dayText: {
    fontSize: 20,
    // fontWeight: "regular",
    color: "white",
    marginTop: 12,
    marginRight: 8,
  },

  amountText: {
    width: "38%",
    padding: 16,
    borderWidth: 2, 
    borderColor: '#FFF9D0',
    borderRadius: 4,
    backgroundColor: 'rgba(255,249,208,0.8)',
    marginHorizontal: 4,
  }
});
export default Day;
