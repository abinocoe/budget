import _ from "lodash";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
  startNumber: number;
  totalAllowance: number;
}

const DayInputs = ({ startNumber, totalAllowance }: Props) => {
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
    <View style={{ width: "90%" }}>
      <Text>
        {totalAllowance
          ? (Math.round(totalAllowance / daysInMonth) / 100)
              .toFixed(2)
              .toString()
          : "0.00"}
      </Text>
      {days.map(date => (
        <View style={{ flexDirection: "row", paddingVertical: 10 }} key={date}>
          <Text>{date}</Text>
          <TextInput
            keyboardType="number-pad"
            style={{
              borderColor: "red",
              borderWidth: 1,
              width: "10%",
              marginHorizontal: 4
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default DayInputs;
