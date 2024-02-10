import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SelectorProps = {
  layout: number;
  optKey: string;
  optValue: number;
  label: string;
  icon?:  string | React.JSX.Element | undefined;
  onChangeFunc: (newValue: number) => void
};

const mainColor = "#04303E";
const unchekedColor = "#89a9b1";

const Selector: FC<SelectorProps> = props => {
  const {layout, optKey, optValue, label, icon, onChangeFunc} = props;
  const containerWidth = (100 / layout).toString() + '%';

  return (
    <View style={{width: containerWidth as DimensionValue }}>
      <TouchableOpacity style={optValue == Number(optKey) ? selectorStyle.selected : selectorStyle.unselected} key={optKey} activeOpacity={0.8} onPress={() => onChangeFunc(Number(optKey))}>
        {icon}
        <Text style={selectorStyle.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  )}

const selectorStyle = StyleSheet.create({
  selected: {
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselected: {
    backgroundColor: unchekedColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 9,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingBottom: 5
  },
});

export default Selector;