import {FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultTextColor, mainFont, touchableOpacityActive } from "../utils/StyleConsts";

type DrumKeyProps = {
  keyLabel: string,
  keyVal: number,
  keyBackground: string,
  onKeyPressed: (val: number, noteOn: boolean, channel: number) => void,
  onKeyReleased: (val: number, noteOn: boolean, channel: number) => void
};

const DrumKey: FC<DrumKeyProps> = props => {
  const {keyLabel, keyVal, keyBackground, onKeyPressed, onKeyReleased} = props;

  return (
    <View style={drumKeyStyle.container}>
      <TouchableOpacity key={keyLabel} style={[drumKeyStyle.drumKey, {borderColor: keyBackground}]} activeOpacity={touchableOpacityActive} onPressIn={(e: any) => onKeyPressed(keyVal, true, 1)} onPressOut={(e: any) => onKeyPressed(keyVal, false, 1)}>
        <Text style={drumKeyStyle.label}>{keyLabel}</Text>
      </TouchableOpacity>
    </View>
  )};

const drumKeyStyle = StyleSheet.create({
  container: {
    width: '28%',
    marginLeft: '2.66%',
    marginRight: '2.66%',
    alignItems: 'center'
  },
  drumKey: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#555555',
    borderWidth: 8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,

  },
  label: {
    fontFamily: mainFont,
    color: defaultTextColor
  }
});

export default DrumKey;