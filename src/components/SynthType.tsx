import { Text, View } from "react-native";
import { FC } from "react";
import AppStyle from "../ui/AppStyle";
import { wFormSelectorContainerHeight } from "../utils/StyleConsts";
import Selector from "./Selector";

import Alg1 from '../assets/img/alg_1.svg';
import Alg2 from '../assets/img/alg_2.svg';

type SynthType = {
  operators: number;
  defaultValue: number;
  onSynthTypeChangeFunc: (newVal: number) => void;
};

const SynthType: FC<SynthType> = props => {
  const {operators, defaultValue, onSynthTypeChangeFunc} = props;

  const synthTypes = {
    0: <Alg1 width={60} height={60} />,
    1: <Alg2 width={60} height={60} />
  };

  return (
    <View style={{height: 120}}>
      <Text style={AppStyle.operatorLabel}>-Algorithm-</Text>
      <View style={{height: 60, flexDirection: 'row'}}>
        {Object.entries(synthTypes).map(([key, val]) => {
          return (
            <Selector
              key={key}
              layout={2}
              optKey={key}
              optValue={defaultValue}
              icon={val}
              onChangeFunc={onSynthTypeChangeFunc}>
            </Selector>
          )
        })}
      </View>
    </View>
  )
}

export default SynthType;