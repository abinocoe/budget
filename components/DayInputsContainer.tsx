import _ from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getDisplayDays, getPeriodStartMonth } from "../lib/date";

import Day from "./Day";

interface Props {
  amountsSpent: { [index: number]: number };
  daysInStartMonth: number;
  startNumber: number;
  totalAllowance: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

const DayInputsContainer = ({
  amountsSpent,
  daysInStartMonth,
  startNumber,
  totalAllowance,
  updateAmountSpent
}: Props) => {
  const days = getDisplayDays(startNumber, getPeriodStartMonth(startNumber));
  return (
    <View style={styles.container}>
      <View style={styles.highlight}>
        <Text style={styles.remainingTotal}>
          {totalAllowance
            ? (Math.floor(totalAllowance / daysInStartMonth) / 100)
                .toFixed(2)
                .toString()
            : "0.00"}
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        {days.map(date => (
          <Day
            amountSpent={amountsSpent[date]}
            date={date}
            key={date}
            updateAmountSpent={updateAmountSpent}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  // daily allowance remaining 
  container: {
    margin: 16,
  },
  
  highlight: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#F887B7",
    backgroundColor: "rgba(248, 135, 183, 0.7)",
    marginTop: 8,
    marginBottom: 24,
    marginLeft: 80,
    marginRight: 80,
  },
  
  remainingTotal: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 16,
  },

});

export default DayInputsContainer;
