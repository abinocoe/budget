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
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.remainingText}>{`Total Remaining: ${decimalise(amountRemaining)}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.remainingText}>
          {`Amount credit: ${decimalise(
            dailyAllowance * daysElapsed - totalSpent
          )}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.remainingText}>
          {`Average per day remain: ${decimalise(
            amountRemaining / daysRemaining
          )}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",    
    margin: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    // backgroundColor: "#364686",
    // shadowOffset:{width: 8,  height: 8,},
    // shadowColor: '#1A2149',
    // shadowOpacity: 0.6,
  },
  remainingText: {
    // color: "#D36ED9", 
    color: "#FBFCFF",
    fontSize: 20,
    paddingBottom: 32,
    width: "100%",
  }
});

export default RemainderCalculations;
