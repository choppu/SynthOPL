import { View, Text, ScrollView } from 'react-native';
import OperatorComponent from '../../components/OperatorComponent';
import AppStyle from '../../ui/AppStyle';
import HorizontalSlider from '../../components/HorizontalSlider';
import { defaultSliderMinValue, defaultSliderStep, maxNoteValue } from '../../utils/AppConsts';
import { Operator } from '../../types/SynthTypes';
import { useAppState } from '../../hooks/appContext';

const DrumScreen = ({ route }: any) =>  {
  const id = route.params.id as number;
  const {appState, dispatch} = useAppState();

  const drum = appState.activeProgram.drums[id];

  const updateNote = (newNote: number) => {

  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <HorizontalSlider label='Note' value={drum.note} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={updateNote}></HorizontalSlider>
      <View style={AppStyle.operatorsContainer}>
      {drum.operators.map((operator: Operator, i: number) => {
        return (
          <View key={i}>
            <Text style={AppStyle.operatorLabel}>-OP- {i + 1} </Text>
            <OperatorComponent operatorId={i} operator={operator}/>
          </View>
        );
      })}
     </View>
    </ScrollView>
  );
}

export default DrumScreen;