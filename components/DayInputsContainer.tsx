import _ from "lodash";
import React from "react";
import { ScrollView, View } from "react-native";

import {
  getDisplayDays,
  getPeriodStartMonth,
  isDateInPeriodStartMonth
} from "../lib/date";

import Day from "./Day";

interface Props {
  amountsSpentPeriodStartMonth: { [index: string]: number };
  amountsSpentPeriodEndMonth: { [index: string]: number };
  startNumber: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

const DayInputsContainer = ({
  amountsSpentPeriodStartMonth,
  amountsSpentPeriodEndMonth,
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
        {days.map(date => {
          const amountSpent = isDateInPeriodStartMonth(date, startNumber)
            ? amountsSpentPeriodStartMonth[date]
            : amountsSpentPeriodEndMonth[date];
          return (
            <Day
              amountSpent={amountSpent}
              date={date}
              key={date}
              updateAmountSpent={updateAmountSpent}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DayInputsContainer;
