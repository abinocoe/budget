import _ from "lodash";
import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";

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
    <View>
      <View style={styles.highlight}>
        <Text style={styles.remainingTotal}>
          {totalAllowance
            ? (Math.floor(totalAllowance / daysInStartMonth) / 100)
                .toFixed(2)
                .toString()
            : "0.00"}
        </Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {days.map(date => (
          <Day 
            amountSpent={amountsSpent[date]}
            date={date}
            key={date}
            updateAmountSpent={updateAmountSpent}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: "#A1175D",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#C61E73",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 80,
    marginRight: 80,
    shadowOffset:{  width: 8,  height: 8,  },
    shadowColor: '#1A2149',
    shadowOpacity: 0.6,
  },
  
  remainingTotal: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 8,
  }
});

export default DayInputsContainer;
