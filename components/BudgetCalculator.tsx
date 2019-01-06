import React, { Component } from "react";

import DayInputs from "./DayInputs";
import PeriodAllowanceInput from "./PeriodAllowance";

interface State {
  periodTotalAmount: number;
}

class BudgetCalculator extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      periodTotalAmount: 50000
    };
    this.updatePeriodTotal.bind(this);
  }

  public updatePeriodTotal = (newTotal: string) => {
    this.setState({ periodTotalAmount: parseInt(newTotal, 10) });
  };

  public render() {
    return (
      <>
        <PeriodAllowanceInput
          allowanceAmount={this.state.periodTotalAmount}
          updateAllowance={this.updatePeriodTotal}
        />
        <DayInputs
          startNumber={25}
          totalAllowance={this.state.periodTotalAmount}
        />
      </>
    );
  }
}

export default BudgetCalculator;
