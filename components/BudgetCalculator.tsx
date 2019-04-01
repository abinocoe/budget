import _ from "lodash";
import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";

import {
  getDisplayDays,
  getPeriodStartMonth,
  isDateInThisMonth,
  numberOfDaysInStartMonth
} from "../lib/date";

import DayInputs from "./DayInputsContainer";
import RemainderCalculations from "./RemainderCalculations";

interface State {
  thisMonthAmountsSpent: { [index: string]: number };
  lastMonthAmountsSpent: { [index: string]: number };
  periodTotalAmount: number;
  periodTotalSpent: number;
  periodStartDate: number;
}

class BudgetCalculator extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      thisMonthAmountsSpent: {},
      lastMonthAmountsSpent: {},
      periodTotalAmount: 50000,
      periodTotalSpent: 0,
      periodStartDate: 25
    };
    this.updatePeriodTotal.bind(this);
    this.updateDayAmountSpent.bind(this);
    this.updatePeriodStart.bind(this);
  }

  public componentWillMount() {
    this.fetchData();
    // TODO handle garbage collection of AsyncStorage ?
  }

  public updatePeriodTotal = (newTotal: number) => {
    this.setState({ periodTotalAmount: newTotal }, this.storePeriodTotal);
  };

  public updatePeriodStart = (newStartDate: number) => {
    this.setState(
      {
        periodStartDate: newStartDate
      },
      this.storeDateSelection
    );
  };

  public updateDayAmountSpent = (amountSpent: number, date: number) => {
    let thisMonthAmountsObject = this.state.thisMonthAmountsSpent;
    let lastMonthAmountsObject = this.state.lastMonthAmountsSpent;

    if (isDateInThisMonth(date, this.state.periodStartDate)) {
      thisMonthAmountsObject = {
        ...this.state.thisMonthAmountsSpent,
        [date]: amountSpent
      };
    } else {
      lastMonthAmountsObject = {
        ...this.state.lastMonthAmountsSpent,
        [date]: amountSpent
      };
    }

    const periodTotalSpent = this.calculateTotalSpent(
      thisMonthAmountsObject,
      lastMonthAmountsObject
    );

    this.setState(
      {
        periodTotalSpent,
        thisMonthAmountsSpent: thisMonthAmountsObject,
        lastMonthAmountsSpent: lastMonthAmountsObject
      },
      () => {
        this.storeData();
        this.storePeriodTotal();
      }
    );
  };

  public render() {
    const periodStartMonth = getPeriodStartMonth(this.state.periodStartDate);
    const daysInStartMonth = numberOfDaysInStartMonth(periodStartMonth);
    const daysElapsed = getDisplayDays(
      this.state.periodStartDate,
      periodStartMonth
    ).length;
    const daysRemaining = daysInStartMonth - daysElapsed + 1;
    const dailyAllowance = Math.round(
      this.state.periodTotalAmount / daysInStartMonth
    );
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: "5%"
        }}
      >
        <RemainderCalculations
          dailyAllowance={dailyAllowance}
          daysElapsed={daysElapsed}
          daysRemaining={daysRemaining}
          intervalStartDate={this.state.periodStartDate}
          totalAllowance={this.state.periodTotalAmount}
          totalSpent={this.state.periodTotalSpent}
          updateAllowance={this.updatePeriodTotal}
          updateIntervalStartDate={this.updatePeriodStart}
        />
        <DayInputs
          startNumber={this.state.periodStartDate}
          updateAmountSpent={this.updateDayAmountSpent}
          amountsSpentThisMonth={this.state.thisMonthAmountsSpent}
          amountsSpentLastMonth={this.state.lastMonthAmountsSpent}
        />
      </View>
    );
  }

  private storeData = async () => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const thisMonthsData = this.state.thisMonthAmountsSpent;
    const lastMonthsData = this.state.lastMonthAmountsSpent;
    await AsyncStorage.multiSet([
      [
        `${today.getMonth()}-${today.getFullYear()}`,
        JSON.stringify(thisMonthsData)
      ],
      [
        `${lastMonth.getMonth()}-${lastMonth.getFullYear()}`,
        JSON.stringify(lastMonthsData)
      ]
    ]);
  };

  private storePeriodTotal = async () => {
    await AsyncStorage.setItem(
      "periodTotalAmount",
      this.state.periodTotalAmount.toString()
    );
  };

  private storeDateSelection = async () => {
    await AsyncStorage.setItem(
      "periodStartDate",
      this.state.periodStartDate.toString()
    );
  };

  private fetchData = async () => {
    const newState = {};
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    // TODO this doesn't need to be stored
    const periodTotalAmount = await AsyncStorage.getItem("periodTotalAmount");
    if (periodTotalAmount !== null) {
      Object.assign(newState, {
        periodTotalAmount
      });
    }

    const periodStartDate = await AsyncStorage.getItem("periodStartDate");
    if (periodStartDate !== null) {
      Object.assign(newState, {
        periodStartDate
      });
    }

    const totals = await AsyncStorage.multiGet([
      `${today.getMonth()}-${today.getFullYear()}`,
      `${lastMonth.getMonth()}-${lastMonth.getFullYear()}`
    ]);
    const thisMonthsData = JSON.parse(totals[0][1]);
    const lastMonthsData = JSON.parse(totals[1][1]);
    if (thisMonthsData !== null) {
      Object.assign(newState, {
        thisMonthAmountsSpent: thisMonthsData
      });
    }
    if (lastMonthsData !== null) {
      Object.assign(newState, {
        lastMonthAmountsSpent: lastMonthsData
      });
    }
    this.setState(newState, () => {
      const periodTotalSpent = this.calculateTotalSpent(
        this.state.thisMonthAmountsSpent,
        this.state.lastMonthAmountsSpent
      );
      this.setState({ periodTotalSpent });
    });
  };

  private calculateTotalSpent = (
    thisMonthAmountsObject: any,
    lastMonthAmountsObject: any
  ) => {
    const isCurrentDateInStartMonth =
      new Date().getDate() >= this.state.periodStartDate;
    let dayTotalArray;

    if (isCurrentDateInStartMonth) {
      dayTotalArray = Object.keys(thisMonthAmountsObject).filter(
        key => parseInt(key, 10) >= this.state.periodStartDate
      );
    } else {
      dayTotalArray = Object.keys(lastMonthAmountsObject)
        .filter(key => parseInt(key, 10) >= this.state.periodStartDate)
        .concat(Object.keys(thisMonthAmountsObject));
    }

    const periodTotalSpent =
      dayTotalArray.length > 0
        ? dayTotalArray
            .map((k: string) =>
              isDateInThisMonth(parseInt(k, 10), this.state.periodStartDate)
                ? thisMonthAmountsObject[k]
                : lastMonthAmountsObject[k]
            )
            .reduce((a, b) => a + b)
        : 0;
    return periodTotalSpent;
  };
}

export default BudgetCalculator;
