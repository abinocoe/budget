import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  dailyAllowance: number;
  daysElapsed: number;
  daysRemaining: number;
  totalAllowance: number;
  totalSpent: number;
}

const RemainderCalculations = ({
  dailyAllowance,
  daysElapsed,
  daysRemaining,
  totalAllowance,
  totalSpent
}: Props) => {
  const amountRemaining = totalAllowance - totalSpent;
  const decimalise = (amount: number) => (amount / 100).toFixed(2).toString();
  const creditOrDebitAmount = dailyAllowance * daysElapsed - totalSpent;
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.text}>{`Daily allowance: ${decimalise(
          dailyAllowance
        )}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>{`Total remaining: ${decimalise(
          amountRemaining
        )}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
          {creditOrDebitAmount >= 0
            ? `Amount credit: ${decimalise(creditOrDebitAmount)}`
            : `Amount debit: ${decimalise(creditOrDebitAmount)}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
          {`Average per day remain: ${decimalise(
            amountRemaining / daysRemaining
          )}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default RemainderCalculations;
