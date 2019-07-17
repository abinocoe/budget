import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as colours from "../constants/colours";

import DateSelection from "./DateSelection";
import PeriodAllowanceInput from "./PeriodAllowance";
import TooltipModal from "./TooltipModal";

interface Props {
  dailyAllowance: number;
  daysElapsed: number;
  daysRemaining: number;
  intervalStartDate: number;
  totalAllowance: number;
  totalSpent: number;
  updateAllowance: (amount: number) => void;
  updateIntervalStartDate: (intervalStart: number) => void;
}

interface State {
  showModal: boolean;
  modalContent: string;
  modalTitle: string;
}

class RemainderCalculations extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
      modalContent: "",
      modalTitle: ""
    };
    this.showModal.bind(this);
  }

  public showModal = (title: string, description: string) => {
    this.setState({
      showModal: true,
      modalTitle: title,
      modalContent: description
    });
  };

  public hideModal = () => {
    this.setState({ showModal: false, modalTitle: "", modalContent: "" });
  };

  public render() {
    const {
      dailyAllowance,
      daysElapsed,
      daysRemaining,
      intervalStartDate,
      totalAllowance,
      totalSpent,
      updateAllowance,
      updateIntervalStartDate
    } = this.props;
    const amountRemaining = totalAllowance - totalSpent;
    const decimalise = (amount: number) => (amount / 100).toFixed(2);

    const creditOrDebitAmount =
      // daysRemaining includes an extra day to always include the current day
      (totalAllowance / (daysRemaining - 1 + daysElapsed)) * daysElapsed -
      totalSpent;

    const creditOrDebitTitle =
      parseFloat(decimalise(creditOrDebitAmount)) >= -0
        ? `Amount credit`
        : `Amount debit`;
    return (
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        <View style={styles.group}>
          <PeriodAllowanceInput
            allowanceAmount={totalAllowance}
            updateAllowance={updateAllowance}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              onPress={() =>
                this.showModal(
                  "Total remaining",
                  "Your total allowance for this month minus the total you've spent so far"
                )
              }
              style={[styles.largeText, { backgroundColor: colours.purple }]}
              testID="totalRemain"
            >
              {decimalise(amountRemaining)}
            </Text>
            <Text style={styles.smallText}>Total remaining</Text>
          </View>
          <DateSelection
            intervalStartDate={intervalStartDate}
            updateIntervalStartDate={updateIntervalStartDate}
          />
        </View>
        <View style={styles.group}>
          <View style={{ alignItems: "center" }}>
            <Text
              onPress={() =>
                this.showModal(
                  "Daily allowance",
                  "Your total allowance divided by the number of days in the month"
                )
              }
              style={[styles.largeText, { backgroundColor: colours.green }]}
            >
              {decimalise(dailyAllowance)}
            </Text>
            <Text style={styles.smallText}>Daily allowance</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              onPress={() =>
                this.showModal(
                  "Average per day remain",
                  "The total amount remaining divided by the number of days remaining (including today)"
                )
              }
              style={[styles.largeText, { backgroundColor: colours.yellow }]}
              testID="averageRemain"
            >
              {decimalise(amountRemaining / daysRemaining)}
            </Text>
            <Text style={styles.smallText}>Average per day remain</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              onPress={() =>
                this.showModal(
                  creditOrDebitTitle,
                  "Your total allowance for the days elapsed so far, minus the total spent"
                )
              }
              style={[styles.largeText, { backgroundColor: colours.orange }]}
              testID="amountDebit"
            >
              {decimalise(
                Math.abs(parseFloat((creditOrDebitAmount / 100).toFixed(2))) ===
                  0
                  ? Math.abs(creditOrDebitAmount)
                  : creditOrDebitAmount
              )}
            </Text>
            <Text style={styles.smallText}>{creditOrDebitTitle}</Text>
          </View>
        </View>
        <TooltipModal
          isVisible={this.state.showModal}
          title={this.state.modalTitle}
          description={this.state.modalContent}
          hideModal={this.hideModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  largeText: {
    fontSize: 30,
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    width: "90%",
    textAlign: "center",
    color: "white",
    elevation: 3
  },
  smallText: {
    fontSize: 12
  },
  group: {
    justifyContent: "flex-start"
  }
});

export default RemainderCalculations;
