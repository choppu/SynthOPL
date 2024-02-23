import {FC } from "react";
import { DimensionValue, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultFontSize, defaultTextColor, mainColor, mainFont, secondaryColor, selectionColor, touchableOpacityActive } from "../utils/StyleConsts";

type InputProps = {
  inputValue: string,
  placeholder: string;
  title: string;
  keyboard: KeyboardTypeOptions | undefined;
  onChangeFunc: (newValue: string) => void
};

const OPLInput: FC<InputProps> = props => {
  const {inputValue, placeholder, title, keyboard, onChangeFunc} = props;

  return (
    <View style={inputStyle.inputContainer}>
      <TextInput keyboardType={keyboard} placeholder={title} style={inputStyle.textInput} cursorColor={mainColor} value={inputValue} key={title} onChangeText={onChangeFunc} selectionColor={selectionColor}></TextInput>
      <Text style={inputStyle.placeholder}>{placeholder}</Text>
    </View>
  )};

const inputStyle = StyleSheet.create({
  inputContainer: {
    width: '80%'
  },
  textInput: {
    width: '100%',
    color: mainColor,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    fontFamily: mainFont,
    fontSize: 14
  },
  placeholder: {
    color: secondaryColor,
    position: 'absolute',
    fontFamily: mainFont,
    right: 0,
    bottom: 15,
    top: 15,
    fontSize: 14
  }
});

export default OPLInput;