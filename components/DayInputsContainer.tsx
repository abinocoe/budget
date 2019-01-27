import _ from "lodash";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { getDisplayDays, numberOfDaysInStartMonth } from "../lib/date";

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
  const days = getDisplayDays(startNumber, 0);
  return (
    <View style={{ flex: 1 }}>
      <Text>
        {totalAllowance
          ? (Math.round(totalAllowance / numberOfDaysInStartMonth(0)) / 100)
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
