import Slider from "@react-native-community/slider";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { mainColor, mainFont, maximumTrackTintColor, minimumTrackColor, secondaryColor, secondaryColorTransparent, verticalSliderContainerHeight, verticalSliderContainerWidth, verticalSliderHeight, verticalSliderOffsetX, verticalSliderOffsetY, verticalSliderRotate, verticalSliderWidth } from "../utils/StyleConsts";
import { defaultSliderMinValue, defaultSliderStep, maxADSRSliderValue } from "../utils/AppConsts";

type ADSRProps = {
  adsrLabel: string;
  adsrValue: number;
  onChangeFunc: (newValue: number) => void
};

const ADSR: FC<ADSRProps> = props => {
  const {adsrLabel, adsrValue, onChangeFunc} = props;

  return (
  <View style={operatorStyle.adsrSliderContainer}>
      <Text style={operatorStyle.adsrLabel}>{adsrLabel}</Text>
      <View style={{width: verticalSliderContainerWidth, height: verticalSliderContainerHeight}}>
        <Slider
        onResponderGrant={() => true}
        style={{width: verticalSliderWidth, height: verticalSliderHeight, transform:[{rotate: verticalSliderRotate}, { translateX: verticalSliderOffsetX }, { translateY: verticalSliderOffsetY }, {scaleY: 3}]}}
        value={adsrValue}
        minimumValue={defaultSliderMinValue}
        maximumValue={maxADSRSliderValue}
        step={defaultSliderStep}
        thumbImage={require('../assets/img/slider_thumb_vertical.png')}
        onValueChange={(newVal: number) => {onChangeFunc(newVal)}}
        minimumTrackTintColor={mainColor}
        maximumTrackTintColor={secondaryColor}/>
      </View>
      <Text style={operatorStyle.adsrLabel}>{adsrValue}</Text>
  </View>
)}

const operatorStyle = StyleSheet.create({
  adsrSliderContainer: {
    alignItems: 'center',
    width: '25%'
  },

  adsrLabel: {
    fontFamily: mainFont,
    fontSize: 11,
    color: mainColor
  }
});

export default ADSR;