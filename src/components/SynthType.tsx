import { Text, View } from "react-native";
import { FC } from "react";
import AppStyle from "../ui/AppStyle";
import { synthTypes } from "../utils/AppConsts";
import { wFormSelectorContainerHeight } from "../utils/StyleConsts";
import Selector from "./Selector";

type SynthType = {
  operators: number;
  defaultValue: number;
  onSynthTypeChangeFunc: (newVal: number) => void;
};

const SynthType: FC<SynthType> = props => {
  const {operators, defaultValue, onSynthTypeChangeFunc} = props;

  return (
    <View style={{height: 100}}>
      <Text style={AppStyle.operatorLabel}>--{operators} OPS-- Synth Type</Text>
      <View style={{height: wFormSelectorContainerHeight, flexDirection: 'row'}}>
        {Object.entries(synthTypes).map(([key, val]) => {
          return (
            <Selector
              key={key}
              layout={2}
              optKey={key}
              optValue={defaultValue}
              label={val as string}
              onChangeFunc={onSynthTypeChangeFunc}>
            </Selector>
          )
        })}
      </View>
    </View>
  )
}

export default SynthType;