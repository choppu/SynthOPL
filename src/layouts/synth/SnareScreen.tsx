import { View, Text, ScrollView } from 'react-native';
import AppStyle from '../../ui/AppStyle';
import { defaultSliderMinValue, defaultSliderStep, maxNoteValue } from '../../utils/AppConsts';
import HorizontalSlider from '../../components/HorizontalSlider';
import Operator from '../../components/Operator';
import { useState } from 'react';

const SnareScreen = () => {
  const [note, setNote] = useState(0);

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <HorizontalSlider label='Note' value={note} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={setNote}></HorizontalSlider>
      <View style={AppStyle.operatorsContainer}>
      <Text style={AppStyle.operatorLabel}>Carrier 1 | -OP2- </Text>
      <Operator operatorId={1}/>
      <Text style={AppStyle.operatorLabel}>Modulator 1 | -OP1- </Text>
      <Operator operatorId={0}/>
      </View>
    </ScrollView>
  );
}

export default SnareScreen;