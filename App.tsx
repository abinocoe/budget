import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import BudgetCalculator from "./components/BudgetCalculator";

export default class App extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <BudgetCalculator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
