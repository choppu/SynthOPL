import { View } from "react-native";
import { defaultSliderMinValue, maxNoteValue, defaultSliderStep, maxFeedbackValue } from "../utils/AppConsts";
import HorizontalSlider from "./HorizontalSlider";
import Toggle from "./Toggle";
import { FC } from "react";

type ChannelProps = {
  chFeedback: number;
  right: boolean;
  left: boolean;
  onChannelRChangeFunc: (newVal: boolean) => void;
  onChannelLChangeFunc: (newVal: boolean) => void;
  onFeedbackChangeFunc: (newVal: number) => void;
};

const Channel: FC<ChannelProps> = props => {
  const {chFeedback, right, left, onChannelRChangeFunc, onChannelLChangeFunc, onFeedbackChangeFunc} = props;

  return (
    <View>
      <View style={{height: 40}}>
        <HorizontalSlider label='Feedback' value={chFeedback} minValue={defaultSliderMinValue} maxValue={maxFeedbackValue} step={defaultSliderStep} onChangeFunc={(newVal: number) => onFeedbackChangeFunc(newVal)}></HorizontalSlider>
      </View>
      <View style={{height: 40, flexDirection: 'row'}}>
        <Toggle layout={2} toggled={left} label={"Channel Left"} onChangeFunc={() => onChannelLChangeFunc(!left)}></Toggle>
        <Toggle layout={2} toggled={right} label={"Channel Right"} onChangeFunc={() => onChannelRChangeFunc(!right)}></Toggle>
      </View>
    </View>

  )
}

export default Channel;