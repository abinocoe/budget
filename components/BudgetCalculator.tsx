import _ from "lodash";
import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import {
  getDisplayDays,
  getPeriodStartMonth,
  numberOfDaysInStartMonth
} from "../lib/date";

import DayInputs from "./DayInputsContainer";
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

  public updatePeriodTotal = (newTotal: number) => {
    this.setState({ periodTotalAmount: newTotal }, this.storePeriodTotal);
  };

  public updatePeriodStart = (newStartDate: number) => {
    if (newStartDate > this.state.periodStartDate) {
      _.range(this.state.periodStartDate, newStartDate).map(date => {
        delete this.state.dailyAmountsSpent[date];
      });
    } else if (newStartDate < this.state.periodStartDate) {
      _.range(
        this.state.periodStartDate + 1,
        numberOfDaysInStartMonth(getPeriodStartMonth(newStartDate))
      )
        .concat(newStartDate === 1 ? [1] : _.range(1, newStartDate))
        .map(date => {
          delete this.state.dailyAmountsSpent[date];
        });
    }
    this.setState({ periodStartDate: newStartDate }, this.storeDateSelection);
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
    const daysRemaining = daysInStartMonth - daysElapsed + 1;
    const dailyAllowance = parseFloat(
      (this.state.periodTotalAmount / daysInStartMonth).toFixed(2)
    );
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "always" }}
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
          amountsSpent={this.state.dailyAmountsSpent}
        />
      </SafeAreaView>
    );
  }

  private handlePreviousMonths = async () => {
    const now = new Date();
    const periodStartMonth = getPeriodStartMonth(this.state.periodStartDate);
    const newDate = new Date(now.getFullYear(), periodStartMonth - 1, 1);
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
    newDate.setMonth(newDate.getMonth() - 1);
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
    const dailyTotals = await AsyncStorage.getItem(`${today.getMonth()}`);
    if (dailyTotals !== null) {
      const dailyData = JSON.parse(dailyTotals);
      Object.assign(newState, {
        dailyAmountsSpent: dailyData.dailyAmountsSpent,
        periodTotalSpent: dailyData.periodTotalSpent,
        periodStartDate: dailyData.periodStartDate
      });
    }
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
    this.setState(newState);
  };
}

export default BudgetCalculator;
