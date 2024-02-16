import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mainColor, touchableOpacityActive } from "../utils/StyleConsts";

type ButtonProps = {
  label?: string | undefined;
  icon?: string | React.JSX.Element | undefined;
  title: string;
  value: any;
  onChangeFunc: (val: any) => void;
};

const OPLButton: FC<ButtonProps> = props => {
  const {label, title, icon, value, onChangeFunc} = props;

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity key={title} style={buttonStyle.button} activeOpacity={touchableOpacityActive} onPress={(val: any) => onChangeFunc(value)}>
      {label ? <Text style={buttonStyle.title}>{label}</Text> : null}
      {icon ? icon : null}
      </TouchableOpacity>
    </View>
  )};

const buttonStyle = StyleSheet.create({
  button: {

  },
  title: {

  },
  icon: {

  }
});

export default OPLButton;