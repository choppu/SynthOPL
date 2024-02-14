import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import OperatorComponent from '../../components/OperatorComponent';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';
import { Operator } from '../../types/SynthTypes';
import { useAppState } from '../../hooks/appContext';
import HorizontalSlider from '../../components/HorizontalSlider';
import { defaultSliderMinValue, defaultSliderStep, maxNoteValue } from '../../utils/AppConsts';

const KeyboardScreen = () => {
  const {appState, dispatch} = useAppState();

  const synthTypes = {
    0: "FM",
    1: "AM"
  };

  const handle4Ops = (operators: Operator [], enable4Ops: boolean) => {
    let arrLength = enable4Ops ? 4: 2;
    return(
      operators.slice(0, arrLength).map((operator: Operator, i: number) => {
        return (
        <View key={i}>
            <Text style={AppStyle.operatorLabel}>-OP- {i + 1} </Text>
            <OperatorComponent operatorId={i} operator={operator}/>
          </View>
        )
      })
    )
  }

  const updateVal = (...params: any) => {

  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepTremolo} label={"Deep Tremolo"} onChangeFunc={() => updateVal(!appState.activeProgram.keyboard.deepTremolo)}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepVibrato} label={"Deep Vibrato"} onChangeFunc={() => updateVal(!appState.activeProgram.keyboard.deepVibrato)}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.enable4Operators} label={"Enable 4 OPs"} onChangeFunc={() => updateVal(!appState.activeProgram.keyboard.enable4Operators)}></Toggle>
      </View>
      <View style={{height: 50}}>
      <HorizontalSlider label='Feedback' value={appState.activeProgram.keyboard.feedback} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={updateVal}></HorizontalSlider>
      </View>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={2} toggled={appState.activeProgram.keyboard.chLeft} label={"Channel Left"} onChangeFunc={() => updateVal("left", !appState.activeProgram.keyboard.chLeft)}></Toggle>
      <Toggle layout={2} toggled={appState.activeProgram.keyboard.chRight} label={"Channel Right"} onChangeFunc={() => updateVal("right", !appState.activeProgram.keyboard.chRight)}></Toggle>
      </View>
      <View style={AppStyle.operatorsContainer}>
        {handle4Ops(appState.activeProgram.keyboard.operators, appState.activeProgram.keyboard.enable4Operators)}
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
