import { View, Text, ScrollView } from 'react-native';
import {useEffect, useState} from 'react';
import Operator from '../../components/Operator';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';

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

  const handle4Ops = () => {
    return mode4Ops ? (
      <View style={AppStyle.operatorsContainer}>
      <Text style={AppStyle.operatorLabel}>Carrier 1 | -OP2- </Text>
      <Operator operatorId={1}/>
      <Text style={AppStyle.operatorLabel}>Modulator 1 | -OP1- </Text>
      <Operator operatorId={0}/>
      <Text style={AppStyle.operatorLabel}>Carrier 1 | -OP4- </Text>
      <Operator operatorId={3}/>
      <Text style={AppStyle.operatorLabel}>Modulator 2 | -OP3- </Text>
      <Operator operatorId={2}/>
      </View>
    ) :
    (
      <View style={AppStyle.operatorsContainer}>
      <Text style={AppStyle.operatorLabel}>Carrier 1 | -OP2- </Text>
      <Operator operatorId={1}/>
      <Text style={AppStyle.operatorLabel}>Modulator 1 | -OP1- </Text>
      <Operator operatorId={0}/>
      </View>
    )
  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={deepTremolo} label={"Deep Tremolo"} onChangeFunc={() => setDeepTremolo(!deepTremolo)}></Toggle>
      <Toggle layout={3} toggled={deepVibrato} label={"Deep Vibrato"} onChangeFunc={() => setDeepVibrato(!deepVibrato)}></Toggle>
      <Toggle layout={3} toggled={mode4Ops} label={"Enable 4 OPs"} onChangeFunc={() => setMode4Ops(!mode4Ops)}></Toggle>
      </View>
      <View style={AppStyle.operatorsContainer}>
        {handle4Ops()}
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
