import React, { Component } from "react";
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
  // dailyAmountsSpent: { [key: string]: number };
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

  public updatePeriodTotal = (newTotal: string) => {
    this.setState({ periodTotalAmount: parseInt(newTotal, 10) });
  };

  public updatePeriodStart = (newStartDate: number) => {
    this.setState({ periodStartDate: newStartDate });
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
    this.setState({
      dailyAmountsSpent,
      periodTotalSpent
    });
  };

  public render() {
    const periodStartMonth = getPeriodStartMonth(this.state.periodStartDate);
    const daysInStartMonth = numberOfDaysInStartMonth(periodStartMonth);
    const daysElapsed = getDisplayDays(
      this.state.periodStartDate,
      periodStartMonth
    ).length;
    const daysRemaining = daysInStartMonth - daysElapsed;
    const dailyAllowance =
      Math.floor(this.state.periodTotalAmount / daysInStartMonth) / 100;
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
          dailyAllowance={dailyAllowance}
          startNumber={this.state.periodStartDate}
          updateAmountSpent={this.updateDayAmountSpent}
          amountsSpent={this.state.dailyAmountsSpent}
        />
      </SafeAreaView>
    );
  }
}

export default BudgetCalculator;
