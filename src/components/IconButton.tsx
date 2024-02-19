import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mainColor, touchableOpacityActive } from "../utils/StyleConsts";

type IconButtonProps = {
  label?: string | undefined;
  icon?: string | React.JSX.Element | undefined;
  title: string;
  value: any;
  disabled: boolean;
  onChangeFunc: (val: any) => void;
};

const IconButton: FC<IconButtonProps> = props => {
  const {label, title, icon, value, disabled, onChangeFunc} = props;

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity key={title} disabled={disabled} style={buttonStyle.button} activeOpacity={touchableOpacityActive} onPress={() => onChangeFunc(value)}>
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

export default IconButton;