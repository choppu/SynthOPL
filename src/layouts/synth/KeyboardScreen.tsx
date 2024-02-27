import { View, ScrollView, Text } from 'react-native';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';
import { useAppState } from '../../hooks/appContext';
import Channel from '../../components/Channel';
import Operators from '../../components/Operators';
import { ConfigPatch, OperatorPatch, OptionPatch } from '../../types/SynthTypes';
import Selector from '../../components/Selector';
import { wFormSelectorContainerHeight } from '../../utils/StyleConsts';
import { synthTypes } from '../../utils/AppConsts';
import SynthType from '../../components/SynthType';

const KeyboardScreen = () => {
  const {appState, dispatch} = useAppState();

  const updateOperator = (operatorId: number, updatedVal: object) => {
    dispatch({type: "updateOperator", payload: {instrumentId: 6, operatorId: operatorId, updatedValue: updatedVal} as OperatorPatch});
  }

  const updateOption = (updatedVal: object) => {
    dispatch({type: "updateOption", payload: {instrumentId: 6, updatedValue: updatedVal} as OptionPatch});
  }

  const updateConfig = (updatedVal: object) => {
    dispatch({type: "updateConfig", payload: {updatedValue: updatedVal} as ConfigPatch});
  }


  return (
    <ScrollView style={AppStyle.screenContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepTremolo} label={"Deep Tremolo"} onChangeFunc={(newVal: boolean) => updateConfig({deepTremolo: newVal})}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepVibrato} label={"Deep Vibrato"} onChangeFunc={(newVal: boolean) => updateConfig({deepVibrato: newVal})}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.enable4Operators} label={"Enable 4 OPs"} onChangeFunc={(newVal: boolean) => updateConfig({enable4Operators: newVal})}></Toggle>
      </View>
      <Channel
      chFeedback={appState.activeProgram.keyboard.feedback}
      left={appState.activeProgram.keyboard.chLeft}
      right={appState.activeProgram.keyboard.chRight}
      onChannelRChangeFunc={(newVal: boolean) => updateOption({chRight: newVal})}
      onChannelLChangeFunc={(newVal: boolean) => updateOption({chLeft: newVal})}
      onFeedbackChangeFunc={(newVal: number) => updateOption({feedback: newVal})}
      >
      </Channel>
      <SynthType operators={2} defaultValue={appState.activeProgram.keyboard.synthType} onSynthTypeChangeFunc={(newVal: number) => updateOption({synthType: newVal})}></SynthType>
      {appState.activeProgram.keyboard.enable4Operators ? <SynthType operators={4} defaultValue={appState.activeProgram.keyboard.synthType4Ops} onSynthTypeChangeFunc={(newVal: number) => updateOption({synthType4Ops: newVal})}></SynthType> : null}
      <View style={AppStyle.operatorsContainer}>
        <Operators lengthOps={appState.activeProgram.keyboard.enable4Operators ? 4 : 2}  operators={appState.activeProgram.keyboard.operators} onOpChangeFunc={updateOperator}></Operators>
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
