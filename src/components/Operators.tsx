import { Text, View } from "react-native";
import { FC } from "react";
import { Operator } from "../types/SynthTypes";
import AppStyle from "../ui/AppStyle";
import OperatorComponent from "./OperatorComponent";

type OperatorsProps = {
  lengthOps: number;
  operators: Operator [];
  onOpChangeFunc: (operatorId: number, patch: object) => void;
};

const Operators: FC<OperatorsProps> = props => {
  const {lengthOps, operators, onOpChangeFunc} = props;

  return (
    <View>
        {operators.slice(0, lengthOps).map((operator: Operator, i: number) => {
          return (
            <View key={i}>
              <Text style={AppStyle.operatorLabel}>-OP- {i + 1} </Text>
              <OperatorComponent operatorId={i} operator={operator} onChangeFunc={onOpChangeFunc}/>
            </View>
          )
        })}
      </View>
  )
}

export default Operators;