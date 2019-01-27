import _ from "lodash";
import React from "react";
import { ScrollView, Text, View } from "react-native";

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
    <View style={{ flex: 1 }}>
      <Text>
        {totalAllowance
          ? (Math.floor(totalAllowance / daysInStartMonth) / 100)
              .toFixed(2)
              .toString()
          : "0.00"}
      </Text>
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

export default DayInputsContainer;
