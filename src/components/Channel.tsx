import { View } from "react-native";
import { defaultSliderMinValue, maxNoteValue, defaultSliderStep } from "../utils/AppConsts";
import HorizontalSlider from "./HorizontalSlider";
import Toggle from "./Toggle";
import { FC } from "react";

type ChannelProps = {
  chFeedback: number;
  right: boolean;
  left: boolean;
  cbFunc: (newVal: any) => void;
};

const Channel: FC<ChannelProps> = props => {
  const {chFeedback, right, left, cbFunc} = props;

  return (
    <View>
      <View style={{height: 40}}>
        <HorizontalSlider label='Feedback' value={chFeedback} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={(newVal: number) => cbFunc(newVal)}></HorizontalSlider>
      </View>
      <View style={{height: 40, flexDirection: 'row'}}>
        <Toggle layout={2} toggled={left} label={"Channel Left"} onChangeFunc={() => cbFunc(!left)}></Toggle>
        <Toggle layout={2} toggled={right} label={"Channel Right"} onChangeFunc={() => cbFunc(!right)}></Toggle>
      </View>
    </View>

  )
}

export default Channel;