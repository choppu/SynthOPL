import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import OperatorComponent from '../../components/OperatorComponent';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';
import { Keyboard, Operator } from '../../types/SynthTypes';

const KeyboardScreen = () => {
  const [deepTremolo, setDeepTremolo] = useState(false);
  const [deepVibrato, setDeepVibrato] = useState(false);
  const [mode4Ops, setMode4Ops] = useState(false);

  const operators = {
    "OP2": {id: 1, type: "carrier"},
    "OP1": {id: 0, type: "modulator"},
    "OP4": {id: 3, type: "carrier"},
    "OP3": {id: 2, type: "modulator"}
  }

  const handle4Ops = (operators: Operator []) => {
    const opsNum = mode4Ops ? 4 : 2;

    return(
      operators.map((operator: Operator, i: number) => {
        <View>
            <Text style={AppStyle.operatorLabel}>-OP {i + 1} </Text>
            <OperatorComponent operatorId={i} operator={operator}/>
          </View>
      })
    )
  }

  const dummyOps = [] as Operator[];

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={deepTremolo} label={"Deep Tremolo"} onChangeFunc={() => setDeepTremolo(!deepTremolo)}></Toggle>
      <Toggle layout={3} toggled={deepVibrato} label={"Deep Vibrato"} onChangeFunc={() => setDeepVibrato(!deepVibrato)}></Toggle>
      <Toggle layout={3} toggled={mode4Ops} label={"Enable 4 OPs"} onChangeFunc={() => setMode4Ops(!mode4Ops)}></Toggle>
      </View>
      <View style={AppStyle.operatorsContainer}>
        {/*handle4Ops(dummyOps)*/}
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
