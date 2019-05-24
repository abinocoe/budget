import React from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  description: string;
  title: string;
  hideModal: () => void;
}

const TooltipModal = (props: Props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}
    >
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          padding: "5%"
        }}
      >
        <Text style={{ fontSize: 16 }}>{props.title}</Text>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center"
          }}
        >
          {props.description}
        </Text>
      </View>
    </Modal>
  );
};

export default TooltipModal;
