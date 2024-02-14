import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import OperatorComponent from '../../components/OperatorComponent';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';
import { Operator } from '../../types/SynthTypes';
import { useAppState } from '../../hooks/appContext';

const KeyboardScreen = () => {
  const {appState, dispatch} = useAppState();
  const [deepTremolo, setDeepTremolo] = useState(false);
  const [deepVibrato, setDeepVibrato] = useState(false);
  const [mode4Ops, setMode4Ops] = useState(appState.activeProgram.keyboard.enable4Operators ? appState.activeProgram.keyboard.enable4Operators: false);

  const handle4Ops = (operators: Operator []) => {
    const opsNum = mode4Ops ? 4 : 2;
    return(
      operators.map((operator: Operator, i: number) => {
        return (
        <View key={i}>
            <Text style={AppStyle.operatorLabel}>-OP- {i + 1} </Text>
            <OperatorComponent operatorId={i} operator={operator}/>
          </View>
        )
      })
    )
  }

  const handleDeepTremolo = (newVal: boolean) => {

  }

  const handleDeepVibrato = (newVal: boolean) => {

  }

  const handleEnable4Ops = (newVal: boolean) => {

  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepTremolo} label={"Deep Tremolo"} onChangeFunc={() => handleDeepTremolo(!appState.activeProgram.keyboard.deepTremolo)}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepVibrato} label={"Deep Vibrato"} onChangeFunc={() => handleDeepVibrato(!appState.activeProgram.keyboard.deepVibrato)}></Toggle>
      <Toggle layout={3} toggled={mode4Ops} label={"Enable 4 OPs"} onChangeFunc={() => handleEnable4Ops(!appState.activeProgram.keyboard.enable4Operators)}></Toggle>
      </View>
      <View style={AppStyle.operatorsContainer}>
        {handle4Ops(appState.activeProgram.keyboard.operators)}
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
