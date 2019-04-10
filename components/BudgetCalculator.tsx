import _ from "lodash";
import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";

import {
  getDisplayDays,
  getPeriodStartMonth,
  isDateInPeriodStartMonth,
  numberOfDaysInStartMonth
} from "../lib/date";

import DayInputs from "./DayInputsContainer";
import RemainderCalculations from "./RemainderCalculations";

interface State {
  periodStartMonthAmountsSpent: { [index: string]: number };
  periodEndMonthAmountsSpent: { [index: string]: number };
  periodTotalAmount: number;
  periodTotalSpent: number;
  periodStartDate: number;
}

class BudgetCalculator extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      periodStartMonthAmountsSpent: {},
      periodEndMonthAmountsSpent: {},
      periodTotalAmount: 50000,
      periodTotalSpent: 0,
      periodStartDate: 1
    };
    this.updatePeriodTotal.bind(this);
    this.updateDayAmountSpent.bind(this);
    this.updatePeriodStart.bind(this);
  }

  public componentWillMount() {
    this.fetchData();
  }

  public componentDidUpdate(_prevProps: {}, prevState: State) {
    if (
      this.state.periodStartMonthAmountsSpent !==
        prevState.periodStartMonthAmountsSpent ||
      this.state.periodEndMonthAmountsSpent !==
        prevState.periodEndMonthAmountsSpent
    ) {
      this.updateTotalSpent(
        this.state.periodStartMonthAmountsSpent,
        this.state.periodEndMonthAmountsSpent
      );
    }

    if (this.state.periodStartDate !== prevState.periodStartDate) {
      const todaysDate = new Date().getDate();
      const wasDatePreviouslyInStartMonth = isDateInPeriodStartMonth(
        todaysDate,
        this.state.periodStartDate
      );
      const isDateNowInStartMonth = isDateInPeriodStartMonth(
        todaysDate,
        prevState.periodStartDate
      );
      if (wasDatePreviouslyInStartMonth !== isDateNowInStartMonth) {
        this.fetchData();
      }
    }
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
    let periodStartMonthAmountsObject = this.state.periodStartMonthAmountsSpent;
    let periodEndMonthAmountsObject = this.state.periodEndMonthAmountsSpent;

    if (isDateInPeriodStartMonth(date, this.state.periodStartDate)) {
      periodStartMonthAmountsObject = {
        ...this.state.periodStartMonthAmountsSpent,
        [date]: amountSpent
      };
    } else {
      periodEndMonthAmountsObject = {
        ...this.state.periodEndMonthAmountsSpent,
        [date]: amountSpent
      };
    }

    this.setState(
      {
        periodStartMonthAmountsSpent: periodStartMonthAmountsObject,
        periodEndMonthAmountsSpent: periodEndMonthAmountsObject
      },
      () => {
        this.storeData();
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
          amountsSpentPeriodStartMonth={this.state.periodStartMonthAmountsSpent}
          amountsSpentPeriodEndMonth={this.state.periodEndMonthAmountsSpent}
        />
      </View>
    );
  }

  private storeData = async () => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const periodStartMonthData = this.state.periodStartMonthAmountsSpent;
    const periodEndMonthData = this.state.periodEndMonthAmountsSpent;
    const isTodayInPeriodStartMonth = isDateInPeriodStartMonth(
      today.getDate(),
      this.state.periodStartDate
    );
    if (isTodayInPeriodStartMonth) {
      await AsyncStorage.setItem(
        `${today.getMonth()}-${today.getFullYear()}`,
        JSON.stringify(periodStartMonthData)
      );
    } else {
      await AsyncStorage.multiSet([
        [
          `${today.getMonth()}-${today.getFullYear()}`,
          JSON.stringify(periodEndMonthData)
        ],
        [
          `${lastMonth.getMonth()}-${lastMonth.getFullYear()}`,
          JSON.stringify(periodStartMonthData)
        ]
      ]);
    }
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

    const isTodayInPeriodStartMonth = isDateInPeriodStartMonth(
      today.getDate(),
      (periodStartDate && parseInt(periodStartDate, 10)) ||
        this.state.periodStartDate
    );

    const totals = await AsyncStorage.multiGet([
      `${today.getMonth()}-${today.getFullYear()}`,
      `${lastMonth.getMonth()}-${lastMonth.getFullYear()}`
    ]);

    const thisMonthsData = JSON.parse(totals[0][1]);
    const lastMonthsData = JSON.parse(totals[1][1]);
    if (isTodayInPeriodStartMonth) {
      if (thisMonthsData !== null) {
        Object.assign(newState, {
          periodStartMonthAmountsSpent: thisMonthsData
        });
      }
    } else {
      if (thisMonthsData !== null) {
        Object.assign(newState, {
          periodEndMonthAmountsSpent: thisMonthsData
        });
      }
      if (lastMonthsData !== null) {
        Object.assign(newState, {
          periodStartMonthAmountsSpent: lastMonthsData
        });
      }
    }
    this.setState(newState);
  };

  private updateTotalSpent = (
    periodStartMonthObject: any,
    periodEndMonthObject: any
  ) => {
    const isCurrentDateInStartMonth = isDateInPeriodStartMonth(
      new Date().getDate(),
      this.state.periodStartDate
    );
    let dayTotalArray;

    if (isCurrentDateInStartMonth) {
      dayTotalArray = Object.keys(periodStartMonthObject).filter(
        key => parseInt(key, 10) >= this.state.periodStartDate
      );
    } else {
      dayTotalArray = Object.keys(periodStartMonthObject)
        .filter(key => parseInt(key, 10) >= this.state.periodStartDate)
        .concat(Object.keys(periodEndMonthObject));
    }

    const periodTotalSpent =
      dayTotalArray.length > 0
        ? dayTotalArray
            .map((k: string) =>
              isDateInPeriodStartMonth(
                parseInt(k, 10),
                this.state.periodStartDate
              )
                ? periodStartMonthObject[k]
                : periodEndMonthObject[k]
            )
            .reduce((a, b) => a + b)
        : 0;
    this.setState({ periodTotalSpent });
  };
}

export default BudgetCalculator;
