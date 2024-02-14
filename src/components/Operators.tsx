import { Text, View } from "react-native";
import { FC } from "react";
import { Operator } from "../types/SynthTypes";
import AppStyle from "../ui/AppStyle";
import { wFormSelectorContainerHeight } from "../utils/StyleConsts";
import OperatorComponent from "./OperatorComponent";
import Selector from "./Selector";

type OperatorsProps = {
  lengthOps: number;
  lengthST: number;
  operators: Operator [];
  synthTypesArr: number [];
  cbFunc: (newVal: any) => void;
};

const Operators: FC<OperatorsProps> = props => {
  const {lengthOps, lengthST, synthTypesArr, operators, cbFunc} = props;

  const synthTypes = [
    {0: "FM", 1: "AM"},
    {0: "FM", 1: "AM"}
  ];

  return (
    <View>
        <Text style={AppStyle.operatorLabel}>--{lengthOps} OPS-- Synth Type </Text>
        {synthTypes.slice(0, lengthST).map((synthType: any, i: number) => {
          let defaultValue = synthTypesArr[lengthST - 1];
          return (
            <View key={i} style={{height: wFormSelectorContainerHeight, flexDirection: 'row'}}>
              {Object.entries(synthType).map(([key, val]) => {
                return (
                  <Selector
                    key={key}
                    layout={2}
                    optKey={key}
                    optValue={defaultValue}
                    label={val as string}
                    onChangeFunc={cbFunc}>
                  </Selector>
                );
              })}
            </View>
          )
        })}

        {operators.slice(0, lengthOps).map((operator: Operator, i: number) => {
          return (
            <View key={i}>
              <Text style={AppStyle.operatorLabel}>-OP- {i + 1} </Text>
              <OperatorComponent operatorId={i} operator={operator}/>
            </View>
          )
        })}
      </View>
  )
}

export default Operators;