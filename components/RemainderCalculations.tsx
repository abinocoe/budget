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
  return (
    <View>
      <View style={styles.row}>
        <Text>{`Total Remaining: ${decimalise(amountRemaining)}`}</Text>
      </View>
      <View style={styles.row}>
        <Text>
          {`Amount credit: ${decimalise(
            dailyAllowance * daysElapsed - totalSpent
          )}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text>
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
  }
});

export default RemainderCalculations;
