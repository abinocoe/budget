import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";

import { getFriendlyDate } from "../lib/date";

interface Props {
  amountSpent: number;
  date: number;
  updateAmountSpent: (amount: number, day: number) => void;
}

interface State {
  editable: boolean;
}
class Day extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      editable: false
    };
    this.handleButtonPress.bind(this);
  }

  public handleButtonPress = () =>
    this.setState({ editable: !this.state.editable });

  public render() {
    return (
      <ListItem
        title={getFriendlyDate(this.props.date)}
        input={{
          keyboardType: "number-pad",
          onEndEditing: e => {
            if (e.nativeEvent.text !== "" && !this.props.amountSpent) {
              this.props.updateAmountSpent(
                parseInt(e.nativeEvent.text, 10),
                this.props.date
              );
            }
          },
          containerStyle: styles.input,
          placeholder: (this.props.amountSpent / 100).toFixed(2),
          editable: this.state.editable
        }}
        rightElement={
          <Button
            buttonStyle={{
              backgroundColor: this.state.editable ? "#8FCB9B" : "#DD2D4A"
            }}
            icon={
              this.state.editable ? (
                <Icon name="check" size={15} color="white" />
              ) : (
                <Icon name="clear" size={15} color="white" />
              )
            }
            onPress={this.handleButtonPress}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold"
  },
  date: {
    width: 20
  },
  input: {
    backgroundColor: "#FFC0CB",
    borderRadius: 2
  }
});

export default Day;
