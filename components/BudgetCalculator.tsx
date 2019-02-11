import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import {
  getDisplayDays,
  getPeriodStartMonth,
  numberOfDaysInStartMonth
} from "../lib/date";

import DateSelection from "./DateSelection";
import DayInputs from "./DayInputsContainer";
import PeriodAllowanceInput from "./PeriodAllowance";
import RemainderCalculations from "./RemainderCalculations";

interface State {
  dailyAmountsSpent: any;
  periodTotalAmount: number;
  periodTotalSpent: number;
  periodStartDate: number;
}

class BudgetCalculator extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      dailyAmountsSpent: {},
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
    this.handlePreviousMonths();
  }

  public updatePeriodTotal = (newTotal: string) => {
    this.setState(
      { periodTotalAmount: parseInt(newTotal, 10) },
      this.storeData
    );
  };

  public updatePeriodStart = (newStartDate: number) => {
    this.setState({ periodStartDate: newStartDate }, this.storeData);
  };

  public updateDayAmountSpent = (amountSpent: number, date: number) => {
    let periodTotalSpent = 0;
    const dailyAmountsSpent = {
      ...this.state.dailyAmountsSpent,
      [date]: amountSpent
    };
    if (isNaN(amountSpent)) {
      delete dailyAmountsSpent[date];
    }
    const dayTotalArray = Object.keys(dailyAmountsSpent);
    if (dayTotalArray.length > 0) {
      periodTotalSpent = dayTotalArray
        .map((k: string) => dailyAmountsSpent[k])
        .reduce((a, b) => a + b);
    }
    this.setState(
      {
        dailyAmountsSpent,
        periodTotalSpent
      },
      this.storeData
    );
  };

  public render() {
    const periodStartMonth = getPeriodStartMonth(this.state.periodStartDate);
    const daysInStartMonth = numberOfDaysInStartMonth(periodStartMonth);
    const daysElapsed = getDisplayDays(
      this.state.periodStartDate,
      periodStartMonth
    ).length;
    const daysRemaining = daysInStartMonth - daysElapsed;
    const dailyAllowance = Math.floor(
      this.state.periodTotalAmount / daysInStartMonth
    );
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "always" }}
        style={{ flex: 1 }}
      >
        <DateSelection
          intervalStartDate={this.state.periodStartDate}
          updateIntervalStartDate={this.updatePeriodStart}
        />
        <PeriodAllowanceInput
          allowanceAmount={this.state.periodTotalAmount}
          updateAllowance={this.updatePeriodTotal}
        />
        <RemainderCalculations
          dailyAllowance={dailyAllowance}
          daysElapsed={daysElapsed}
          daysRemaining={daysRemaining}
          totalAllowance={this.state.periodTotalAmount}
          totalSpent={this.state.periodTotalSpent}
        />
        <DayInputs
          startNumber={this.state.periodStartDate}
          updateAmountSpent={this.updateDayAmountSpent}
          amountsSpent={this.state.dailyAmountsSpent}
        />
      </SafeAreaView>
    );
  }

  private handlePreviousMonths = async () => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth(), -1);
    const lastMonthsData = await AsyncStorage.getItem(`${newDate.getMonth()}`);
    if (lastMonthsData !== null) {
      const data = JSON.parse(lastMonthsData);
      if (data.periodTotalAmount && data.periodTotalSpent) {
        await AsyncStorage.setItem(
          `${newDate.getMonth()}`,
          (data.periodTotalAmount - data.periodTotalSpent).toString()
        );
      }
    }
    newDate.setMonth(newDate.getMonth(), -1);
    const monthBeforeThat = await AsyncStorage.getItem(`${newDate.getMonth()}`);
    if (monthBeforeThat !== null) {
      await AsyncStorage.removeItem(`${newDate.getMonth()}`);
    }
  };

  private storeData = async () => {
    const today = new Date();
    const data = this.state;
    const jsonOfItem = await AsyncStorage.setItem(
      `${today.getMonth()}`,
      JSON.stringify(data)
    );
    return jsonOfItem;
  };

  private fetchData = async () => {
    const today = new Date();
    const savedData = await AsyncStorage.getItem(`${today.getMonth()}`);
    if (savedData !== null) {
      const data = JSON.parse(savedData);
      this.setState({
        dailyAmountsSpent: data.dailyAmountsSpent,
        periodTotalAmount: data.periodTotalAmount,
        periodTotalSpent: data.periodTotalSpent,
        periodStartDate: data.periodStartDate
      });
    }
  };
}

export default BudgetCalculator;
