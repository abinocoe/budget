import _ from "lodash";
import React from "react";
import { ScrollView, View } from "react-native";

import { getDisplayDays, getPeriodStartMonth } from "../lib/date";

import Day from "./Day";

interface Props {
  amountsSpent: { [index: number]: number };
  startNumber: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

const DayInputsContainer = ({
  amountsSpent,
  startNumber,
  updateAmountSpent
}: Props) => {
  const days = getDisplayDays(
    startNumber,
    getPeriodStartMonth(startNumber)
  ).reverse();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginVertical: 30 }}>
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
