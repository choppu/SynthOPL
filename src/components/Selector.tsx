import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultFontSize, defaultTextColor, mainColor, mainFont, secondaryColor, touchableOpacityActive } from "../utils/StyleConsts";

type SelectorProps = {
  layout: number;
  optKey: string;
  optValue: number;
  label: string;
  icon?:  string | React.JSX.Element | undefined;
  onChangeFunc: (newValue: number) => void
};

const Selector: FC<SelectorProps> = props => {
  const {layout, optKey, optValue, label, icon, onChangeFunc} = props;
  const containerWidth = (100 / layout).toString() + '%';

  return (
    <View style={{width: containerWidth as DimensionValue}}>
      <TouchableOpacity style={optValue == Number(optKey) ? selectorStyle.selected : selectorStyle.unselected} key={optKey} activeOpacity={touchableOpacityActive} onPress={() => onChangeFunc(Number(optKey))}>
        {icon}
        <Text style={selectorStyle.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  )};

const selectorStyle = StyleSheet.create({
  selected: {
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  unselected: {
    backgroundColor: secondaryColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  label: {
    fontFamily: mainFont,
    fontSize: defaultFontSize,
    color: defaultTextColor,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Selector;