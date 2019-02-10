import _ from "lodash";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { getDisplayDays, getPeriodStartMonth } from "../lib/date";

import Day from "./Day";

interface Props {
  amountsSpent: { [index: number]: number };
  dailyAllowance: number;
  startNumber: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

const DayInputsContainer = ({
  amountsSpent,
  dailyAllowance,
  startNumber,
  updateAmountSpent
}: Props) => {
  const days = getDisplayDays(startNumber, getPeriodStartMonth(startNumber));
  return (
    <View style={{ flex: 1 }}>
      <Text>{dailyAllowance}</Text>
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
