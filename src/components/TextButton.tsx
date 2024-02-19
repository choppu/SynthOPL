import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mainColor, mainFont, secondaryColor, touchableOpacityActive } from "../utils/StyleConsts";

type TextButtonProps = {
  label: string;
  disabled: boolean;
  btnColor: string;
  btnWidth: string;
  btnJustifyContent: string;
  onChangeFunc: () => void;
};

const TextButton: FC<TextButtonProps> = props => {
  const {label, disabled, btnColor, btnWidth, btnJustifyContent, onChangeFunc} = props;

  return (
    <View style={[buttonStyle.textBtnContainer, {width: btnWidth as DimensionValue, justifyContent: btnJustifyContent as any}]}>
      <TouchableOpacity key={label} disabled={disabled} style={buttonStyle.button} activeOpacity={touchableOpacityActive} onPress={onChangeFunc}>
        <Text style={[buttonStyle.title, {color: btnColor}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  )};

const buttonStyle = StyleSheet.create({
    textBtnContainer: {
      flexDirection: 'row',
      textAlign: 'center',
      paddingTop: 25,
      paddingBottom: 15,
      justifyContent: 'flex-start'
    },
    button: {

    },
    title: {
      fontFamily: 'Inconsolata-SemiBold',
      fontSize: 15,
      textTransform: 'uppercase',

    },
  });

export default TextButton;