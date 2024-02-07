import Slider from "@react-native-community/slider";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const mainColor = "#04303E";

type ADSRProps = {
  adsrType: string;
  adsrValue: number;
  adsrValueUpdate: (newValue: number) => void
};

const ADSRComponent: FC<ADSRProps> = props => {
  const {adsrType, adsrValue, adsrValueUpdate} = props;
  const [sliderValue, setSliderValue] = useState(adsrValue);

  const updateADSRValue = (newValue: number) => {
    setSliderValue(newValue)
    adsrValueUpdate(newValue);
  }

  const maxADSRValue = 15;
  const minimumTrackColor = "#04303E88";
  const sliderThumbColor = mainColor;

  return (
  <View style={operatorStyle.adsrSliderContainer}>
      <Text style={operatorStyle.adsrLabel}>{adsrType}</Text>
      <View style={{width: 60, height: 150}}>
      <Slider
      style={{width: 150, height: 20, transform:[{rotate: "-90deg"}, { translateX: -65 }, { translateY: -45 }]}}
      value={sliderValue}
      minimumValue={0}
      maximumValue={maxADSRValue}
      step={1}
      thumbTintColor={sliderThumbColor}
      onValueChange={updateADSRValue}
      minimumTrackTintColor={minimumTrackColor}
      maximumTrackTintColor="#000000"/>
      </View>
      <Text style={operatorStyle.adsrLabel}>{sliderValue}</Text>
      </View>
)}

const operatorStyle = StyleSheet.create({
  adsrSliderContainer: {
    alignItems: 'center'
  },

  adsrLabel: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 12,
    color: mainColor
  }
});

export default ADSRComponent;