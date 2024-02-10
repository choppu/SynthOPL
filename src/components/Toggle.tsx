import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ToggleProps = {
  layout: number;
  toggled: boolean;
  element?: number | string;
  label: string;
  labelAbbr?: string | undefined;
  onChangeFunc: (el?: any) => void
};

const mainColor = "#04303E";
const unchekedColor = "#89a9b1";

const Toggle: FC<ToggleProps> = props => {
  const {layout, toggled, element, label, labelAbbr, onChangeFunc} = props;

  const elementWidth = (100 / layout).toString() + '%';

  const handleLabel = () => {
    return labelAbbr ? label + "\n" + labelAbbr : label;
  }

  return (
    <View style={{flexDirection: 'row', width: elementWidth as DimensionValue, marginBottom: 5, borderRightColor: 'white'}}>
      <TouchableOpacity key={element} style={toggled ? toggleStyle.on : toggleStyle.off} activeOpacity={0.8} onPress={() => onChangeFunc(element)}>
        <Text style={toggleStyle.label}>
          {handleLabel()}
        </Text>
      </TouchableOpacity>
    </View>
  )}

const toggleStyle = StyleSheet.create({
  on: {
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  off: {
    backgroundColor: unchekedColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  label: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 9,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
});

export default Toggle;