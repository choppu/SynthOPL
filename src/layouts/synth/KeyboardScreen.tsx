import { View, ScrollView, Text } from 'react-native';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';
import { useAppState } from '../../hooks/appContext';
import Channel from '../../components/Channel';
import Operators from '../../components/Operators';
import { ConfigPatch, OperatorPatch, OptionPatch, synthAlgorithm } from '../../types/SynthTypes';
import SynthType from '../../components/SynthType';

import Alg1 from '../../assets/img/alg_1.svg';
import Alg2 from '../../assets/img/alg_2.svg';
import Alg3 from '../../assets/img/alg_3.svg';
import Alg4 from '../../assets/img/alg_4.svg';
import Alg5 from '../../assets/img/alg_5.svg';
import Alg6 from '../../assets/img/alg_6.svg';
import Selector from '../../components/Selector';

const KeyboardScreen = () => {
  const {appState, dispatch} = useAppState();

  const algorithms = [
    {enable4Ops: false, synth_2Ops: 0, synth_4Ops: 0, icon: <Alg1 width={60} height={60} />} as synthAlgorithm,
    {enable4Ops: false, synth_2Ops: 1, synth_4Ops: 0, icon: <Alg2 width={60} height={60} />} as synthAlgorithm,
    {enable4Ops: true, synth_2Ops: 0, synth_4Ops: 0, icon: <Alg3 width={60} height={60} />} as synthAlgorithm,
    {enable4Ops: true, synth_2Ops: 0, synth_4Ops: 1, icon: <Alg4 width={60} height={60} />} as synthAlgorithm,
    {enable4Ops: true, synth_2Ops: 1, synth_4Ops: 0, icon: <Alg5 width={60} height={60} />} as synthAlgorithm,
    {enable4Ops: true, synth_2Ops: 1, synth_4Ops: 1, icon: <Alg6 width={60} height={60} />} as synthAlgorithm
  ]

  const updateOperator = (operatorId: number, updatedVal: object) => {
    dispatch({type: "updateOperator", payload: {instrumentId: 6, operatorId: operatorId, updatedValue: updatedVal} as OperatorPatch});
  }

  const updateOption = (updatedVal: object) => {
    dispatch({type: "updateOption", payload: {instrumentId: 6, updatedValue: updatedVal} as OptionPatch});
  }

  const updateConfig = (updatedVal: object) => {
    dispatch({type: "updateConfig", payload: {updatedValue: updatedVal} as ConfigPatch});
  }

  const getAlgorithm = (algs: synthAlgorithm[]) => {
    return algs.findIndex((alg, _) => (alg.enable4Ops == appState.activeProgram.keyboard.enable4Operators) && (alg.synth_2Ops == appState.activeProgram.keyboard.synthType) && (alg.synth_4Ops == appState.activeProgram.keyboard.synthType4Ops));
  }

  const updateSynthAlgorithm = (index: number) => {
    updateConfig({enable4Operators: algorithms[index].enable4Ops});
    updateOption({synthType: algorithms[index].synth_2Ops, synthType4Ops: algorithms[index].synth_4Ops});
  }

  return (
    <ScrollView style={AppStyle.screenContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={2} toggled={appState.activeProgram.keyboard.deepTremolo} label={"Deep Tremolo"} onChangeFunc={(newVal: boolean) => updateConfig({deepTremolo: newVal})}></Toggle>
      <Toggle layout={2} toggled={appState.activeProgram.keyboard.deepVibrato} label={"Deep Vibrato"} onChangeFunc={(newVal: boolean) => updateConfig({deepVibrato: newVal})}></Toggle>
      </View>
      <View>
        <Text style={AppStyle.operatorLabel}>-Algorithm-</Text>
        <View style={{height: 100, flexDirection: 'row'}}>
          {algorithms.map((synthAlg, index) => {
            return (
              <Selector
              key={index}
              layout={algorithms.length}
              optKey={index.toString()}
              optValue={getAlgorithm(algorithms)}
              icon={synthAlg.icon}
              onChangeFunc={updateSynthAlgorithm}>
              </Selector>
            );
          })}
      </View>

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
      <View style={AppStyle.operatorsContainer}>
        <Operators lengthOps={appState.activeProgram.keyboard.enable4Operators ? 4 : 2}  operators={appState.activeProgram.keyboard.operators} onOpChangeFunc={updateOperator}></Operators>
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
