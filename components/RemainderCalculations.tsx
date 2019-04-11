import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import * as colours from "../constants/colours";

import DateSelection from "./DateSelection";
import PeriodAllowanceInput from "./PeriodAllowance";

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
}

class RemainderCalculations extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
      modalContent: ""
    };
  }

  public showModal = (contentString: string) => {
    this.setState({ showModal: true, modalContent: contentString });
  };

  public hideModal = () => {
    this.setState({ showModal: false, modalContent: "" });
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
                  "Your total allowance divided by the number of days in the start month"
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
            <Text style={styles.smallText}>
              {parseFloat(decimalise(creditOrDebitAmount)) >= -0
                ? `Amount credit`
                : `Amount debit`}
            </Text>
          </View>
        </View>
        <Modal
          isVisible={this.state.showModal}
          onBackButtonPress={this.hideModal}
          onBackdropPress={this.hideModal}
        >
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>{this.state.modalContent}</Text>
          </View>
        </Modal>
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
