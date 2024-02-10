import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useEffect, useState} from 'react';
import Operator from '../../components/Operator';
import Toggle from '../../components/Toggle';

const mainColor = "#04303E";

const KeyboardScreen = () => {
  const [deepTremolo, setDeepTremolo] = useState(false);
  const [deepVibrato, setDeepVibrato] = useState(false);
  const [mode4Ops, setMode4Ops] = useState(false);

  const handle4Ops = () => {
    return mode4Ops ? (
      <View style={keyboardScreenStyle.operatorsContainer}>
      <Text style={keyboardScreenStyle.operatorLabel}>Carrier 1 | -OP2- </Text>
      <Operator operatorId={1}/>
      <Text style={keyboardScreenStyle.operatorLabel}>Modulator 1 | -OP1- </Text>
      <Operator operatorId={0}/>
      <Text style={keyboardScreenStyle.operatorLabel}>Carrier 1 | -OP3- </Text>
      <Operator operatorId={3}/>
      <Text style={keyboardScreenStyle.operatorLabel}>Modulator 2 | -OP4- </Text>
      <Operator operatorId={2}/>
      </View>
    ) :
    (
      <View style={keyboardScreenStyle.operatorsContainer}>
      <Text style={keyboardScreenStyle.operatorLabel}>Carrier 1 | -OP2- </Text>
      <Operator operatorId={1}/>
      <Text style={keyboardScreenStyle.operatorLabel}>Modulator 1 | -OP1- </Text>
      <Operator operatorId={0}/>
      </View>
    )
  }

  useEffect(() => {

  }, [mode4Ops])

  return (
    <ScrollView style={keyboardScreenStyle.container}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={deepTremolo} label={"Deep Tremolo"} onChangeFunc={() => setDeepTremolo(!deepTremolo)}></Toggle>
      <Toggle layout={3} toggled={deepVibrato} label={"Deep Vibrato"} onChangeFunc={() => setDeepVibrato(!deepVibrato)}></Toggle>
      <Toggle layout={3} toggled={mode4Ops} label={"Enable 4 OPs"} onChangeFunc={() => setMode4Ops(!mode4Ops)}></Toggle>
      </View>
      <View style={keyboardScreenStyle.operatorsContainer}>
        {handle4Ops()}
      </View>
    </ScrollView>
  );
}

const keyboardScreenStyle = StyleSheet.create({
  container: {

  },
  operatorsContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  operatorLabel: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 13,
    color: mainColor,
    padding: 10
  }
});

export default KeyboardScreen;
