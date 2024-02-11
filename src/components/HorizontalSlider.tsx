import Slider from "@react-native-community/slider";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { defaultFontSize, horizontalSliderContainerHeight, mainColor, mainFont, maximumTrackTintColor } from "../utils/StyleConsts";

type HorizontalSliderProps = {
  label: string;
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  onChangeFunc: (newVal: number) => void
};

const HorizontalSlider: FC<HorizontalSliderProps> = props => {
  const {label, value, minValue, maxValue, step, onChangeFunc} = props;

  return (
    <View style={operatorStyle.horizontalSliderContainer}>
      <Text style={operatorStyle.horizontalSliderLabel}>{label}</Text>
      <Slider
      style={operatorStyle.horizontalSlider}
      value={value}
      minimumValue={minValue}
      maximumValue={maxValue}
      step={step}
      thumbTintColor={mainColor}
      onValueChange={(newVal: number) => onChangeFunc(newVal)}
      minimumTrackTintColor={mainColor}
      maximumTrackTintColor={maximumTrackTintColor}/>
      <Text style={operatorStyle.horizontalSliderValueLabel}>{value}</Text>
    </View>
)}

const operatorStyle = StyleSheet.create({
  horizontalSliderContainer: {
    flexDirection: 'row',
    height: horizontalSliderContainerHeight,
    justifyContent: 'center',
    padding: 5,
    marginTop: 5
  },
  horizontalSlider: {
    width: '55%'
  },
  horizontalSliderLabel: {
    fontFamily: mainFont,
    fontSize: defaultFontSize,
    lineHeight: 20,
    color: mainColor,
    textTransform: 'uppercase',
    width: '33%',
    textAlign: 'left',
    marginLeft: '2%'
  },
  horizontalSliderValueLabel: {
    fontFamily: mainFont,
    fontSize: defaultFontSize,
    lineHeight: 20,
    color: mainColor,
    textTransform: 'uppercase',
    width: '8%',
    textAlign: 'right',
    marginRight: '2%'
  }
});

export default HorizontalSlider;