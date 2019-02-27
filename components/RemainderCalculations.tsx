import React from "react";
import { StyleSheet, Text, View } from "react-native";

import * as colours from "../constants/colours";

import DateSelection from "./DateSelection";
import PeriodAllowanceInput from "./PeriodAllowance";

interface Props {
  dailyAllowance: number;
  daysElapsed: number;
  daysRemaining: number;
  intervalStartDate: number;
  totalAllowance: number;
  totalSpent: number;
  updateAllowance: (amount: number) => void;
  updateIntervalStartDate: (intervalStart: number) => void;
}

const RemainderCalculations = ({
  dailyAllowance,
  daysElapsed,
  daysRemaining,
  intervalStartDate,
  totalAllowance,
  totalSpent,
  updateAllowance,
  updateIntervalStartDate
}: Props) => {
  const amountRemaining = totalAllowance - totalSpent;
  const decimalise = (amount: number) => (amount / 100).toFixed(2).toString();
  const creditOrDebitAmount = dailyAllowance * daysElapsed - totalSpent;
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly"
      }}
    >
      <View style={styles.group}>
        <PeriodAllowanceInput
          allowanceAmount={totalAllowance}
          updateAllowance={updateAllowance}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.largeText}>{decimalise(amountRemaining)}</Text>
          <Text style={styles.smallText}>Total remaining</Text>
        </View>
        <DateSelection
          intervalStartDate={intervalStartDate}
          updateIntervalStartDate={updateIntervalStartDate}
        />
      </View>
      <View style={styles.group}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.largeText}>{decimalise(dailyAllowance)}</Text>
          <Text style={styles.smallText}>Daily allowance</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.largeText}>
            {decimalise(amountRemaining / daysRemaining)}
          </Text>
          <Text style={styles.smallText}>Average per day remain</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.largeText}>
            {decimalise(creditOrDebitAmount)}
          </Text>
          <Text style={styles.smallText}>
            {creditOrDebitAmount >= 0 ? `Amount credit` : `Amount debit`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  largeText: {
    fontSize: 30,
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    width: "90%",
    textAlign: "center",
    backgroundColor: colours.mauve,
    color: "white"
  },
  smallText: {
    fontSize: 12
  },
  group: {
    justifyContent: "flex-start"
  }
});

export default RemainderCalculations;
