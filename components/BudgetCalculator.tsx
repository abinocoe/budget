import React, { Component } from "react";
import SafeAreaView from "react-native-safe-area-view";

import DayInputs from "./DayInputsContainer";
import PeriodAllowanceInput from "./PeriodAllowance";
import RemainderCalculations from "./RemainderCalculations";

interface State {
  dailyAmountsSpent: any;
  // dailyAmountsSpent: { [key: string]: number };
  periodTotalAmount: number;
  periodTotalSpent: number;
}

class BudgetCalculator extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      dailyAmountsSpent: {},
      periodTotalAmount: 50000,
      periodTotalSpent: 0
    };
    this.updatePeriodTotal.bind(this);
    this.updateDayAmountSpent.bind(this);
  }

  public updatePeriodTotal = (newTotal: string) => {
    this.setState({ periodTotalAmount: parseInt(newTotal, 10) });
  };

  public updateDayAmountSpent = (amountSpent: number, date: number) => {
    const dailyAmountsSpent = {
      ...this.state.dailyAmountsSpent,
      [date]: amountSpent
    };
    const periodTotalSpent = Object.keys(dailyAmountsSpent)
      .map((k: string) => dailyAmountsSpent[k])
      .reduce((a, b) => a + b);
    this.setState({
      dailyAmountsSpent,
      periodTotalSpent
    });
  };

  public render() {
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "always" }}
        style={{ flex: 1 }}
      >
        <PeriodAllowanceInput
          allowanceAmount={this.state.periodTotalAmount}
          updateAllowance={this.updatePeriodTotal}
        />
        <RemainderCalculations
          dailyAllowance={1860}
          daysElapsed={10}
          daysRemaining={10}
          totalAllowance={this.state.periodTotalAmount}
          totalSpent={this.state.periodTotalSpent}
        />
        <DayInputs
          startNumber={25}
          totalAllowance={this.state.periodTotalAmount}
          updateAmountSpent={this.updateDayAmountSpent}
          amountsSpent={this.state.dailyAmountsSpent}
        />
      </SafeAreaView>
    );
  }
}

export default BudgetCalculator;
