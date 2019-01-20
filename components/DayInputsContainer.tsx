import _ from "lodash";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import Day from "./Day";

interface Props {
  amountsSpent: { [index: number]: number };
  startNumber: number;
  totalAllowance: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

const DayInputsContainer = ({
  amountsSpent,
  startNumber,
  totalAllowance,
  updateAmountSpent
}: Props) => {
  const today = new Date();
  const dateToday = today.getDate();
  const daysInMonth =
    32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
  let days: number[];
  if (dateToday < startNumber) {
    days = [
      ..._.range(startNumber, daysInMonth + 1).concat(
        dateToday === 1 ? [1] : _.range(1, dateToday + 1)
      )
    ];
  } else if (dateToday === startNumber) {
    days = [startNumber];
  } else {
    days = _.range(startNumber, dateToday + 1);
  }
  return (
    <View style={{ flex: 1 }}>
      <Text>
        {totalAllowance
          ? (Math.round(totalAllowance / daysInMonth) / 100)
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
