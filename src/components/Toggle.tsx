import {FC } from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultFontSize, defaultTextColor, mainColor, mainFont, secondaryColor, touchableOpacityActive } from "../utils/StyleConsts";

type ToggleProps = {
  layout: number;
  toggled: boolean;
  element?: number | string;
  label: string;
  labelAbbr?: string | undefined;
  onChangeFunc: (el?: any) => void
};

const Toggle: FC<ToggleProps> = props => {
  const {layout, toggled, element, label, labelAbbr, onChangeFunc} = props;
  const elementWidth = (100 / layout).toString() + '%';

  const handleLabel = () => {
    return labelAbbr ? label + "\n" + labelAbbr : label;
  };

  return (
    <View style={{flexDirection: 'row', width: elementWidth as DimensionValue, marginBottom: 5}}>
      <TouchableOpacity key={element} style={toggled ? toggleStyle.on : toggleStyle.off} activeOpacity={touchableOpacityActive} onPress={() => onChangeFunc(element)}>
        <Text style={toggleStyle.label}>
          {handleLabel()}
        </Text>
      </TouchableOpacity>
    </View>
  )};

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
    backgroundColor: secondaryColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  label: {
    fontFamily: mainFont,
    fontSize: defaultFontSize,
    color: defaultTextColor,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
});

export default Toggle;